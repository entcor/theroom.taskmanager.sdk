const waiters = require('./waiters');
const actions = require('./actions');
const bridge = require('./bridge');

const tasks = {};

const connect = async (host, credentials) => {
  if (credentials.token) return;

  return new Promise((resolve, reject) => {
    bridge.connect( { host, useSsl: host.indexOf('https:') === 0 }, async (err) => {
      if (err) return reject(err);

      await bridge.login({username: credentials.user, password: credentials.password});
      // const roomsJoined = await driver.joinRooms(ROOMS);
    
      await bridge.subscribeToMessages();
      await bridge.reactToMessages( processMessages );

      resolve();
    });
  });
};

const sendMessage = async (roomName, userName, content) => {
  if (userName) {
    return await bridge.sendDirectToUser(content, userName);
  } 

  return await bridge.sendToRoom(content, roomName); 
};

const waiterEvent = async (params, content) => {
  const act = typeof params.action === 'function' ? params.action : actions[params.action.id];
  if (!act) throw Error (`Wrong action id: ${ params.action.id }`);
  const content2send = await act(params.action, content);
  await sendMessage(params.dest.roomName, params.dest.userName, content2send); 
}

defaultTask = {
  waiter: { id: 'clientQuery' },
  action: { id: 'empty' },
  dest: { roomName: 'GENERAL' },
}

const registerTask = async (data) => {
  data = Object.assign({}, defaultTask, data);
  
  const waiter = waiters[data.waiter.id];
  if (!waiter) throw new Error(`Wrong waiter id ${data.waiter.id}`);
  
  tasks[data.id] = data;

  if (data.waiter.id !== 'clientQuery') {
    waiter(data.waiter, (content) => waiterEvent(data, content) );
  } else {
    console.log('reg', data.id, data);
    await bridge.registerCommand(data.id, data);
  }
};

const removeTask = async (id) => {
  await bridge.removeCommand(id);
  delete tasks[id];
}

const processMessages = async (err, message, messageOptions) => {
  /* 
    { _id: '4SFZw3jRPLQe8jkKh',
      rid: 'QLS3i9kp5hSBDcgSQ',
      u:
      { _id: '...', username: '...', name: '...' },
      msg:
      '{"context":"cmd1","roomId":"GENERAL","userId":"4T2bHhPuFgieS7Sfm","userName":"Administrator"}',
      ts: { '$date': 1557024233733 },
      _updatedAt: { '$date': 1557024233759 },
      alias: 'remote executor',
      mentions: [],
      channels: [] }
  */

  if (!err){
    try {
      let json;
      try { json = JSON.parse(message.msg); } catch (ex) { return; }

      const cmdData = json.context.split(' ');
      const cmd = cmdData[0];
      const roomId = message.rid;

      console.log('exec command:', cmd, 'in the room:', roomId);

      if (tasks[cmd]) {
        
        const res = await waiterEvent(tasks[cmd], ...cmdData.splice(1));

        //const res = await tasks[cmd].onExec(...cmdData.splice(1));
        //console.log('res', res);
        if (res) bridge.sendResponseCommand({
          dUser:  json.userId,
          roomId: json.roomId,
          cmd: cmd,
          message: res 
        }, roomId); 
      }
    } catch (ex) {
      console.log(ex);
    }
  }
}

module.exports = {
  registerTask,
  removeTask,
  connect,
};
