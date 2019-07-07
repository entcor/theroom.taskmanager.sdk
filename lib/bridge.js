
const sdk = require('theroom.sdk');

async function registerCommand(id, params){
  // await sdk.driver.execSlashCommand({ cmd: 'registerremotecommand', params: 'cmd1 {"dd":"123"}', msg: { rid, msg: '' } });
  await sdk.driver.execSlashCommand({ cmd: 'registerremotecommand', params: `${id} ${JSON.stringify(params)}`, msg: { rid: 'undefined', msg: '' } });
}

async function sendResponseCommand(data, rid) {
  await sdk.driver.execSlashCommand({ cmd: 'responseremotecommand', params: JSON.stringify(data), msg: { rid, msg: '' } });
}

module.exports = {
  registerCommand,
  sendResponseCommand,
  ...sdk.driver,
};
