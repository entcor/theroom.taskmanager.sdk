const sdk = require('../index');
const getRandomExample = require('./examples');

const example = async () => {
  try{
    await sdk.connect('https://test.alnikitich.ecambro.ru', {user: 'test', password: 'test'});

    await sdk.registerTask({
      id: 'test1',
      description: 'nodejs script data by remote query',
      waiter: { id: 'clientQuery' },
      action: async (...params) => {
        console.log('Query with params:', params)
        return getRandomExample();
      },
    });

    await sdk.registerTask({
      id: 'test2',
      description: 'file data by file change',
      waiter: {id: 'fileChange', file: './example.md'},
      dest: { 
        // you can send message to:
        // 1) one user messgae by send to user room: userName = 'testUser'
        // 2) multiple users message by send to group: roomName = 'general'
        roomName: 'general',
        // userName: 'test',
      },
    });

    await sdk.registerTask({
      id: 'test3',
      description: 'file data by client query',
      waiter: { id: 'clientQuery' },
      action: { id: 'readFile', file: './example.md'},
    });

  } catch (ex) {
    console.log('error:', ex);
    process.exit(1);
  }
};

example();
