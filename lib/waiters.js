
const fs = require('fs');

module.exports = {
  // script: {
  //   type: 'query',
  //   handler: (params, query) => params.onExec(query),
  // },

  // fileQuery: {
  //   type: 'query',
  //   handler: (params) => {
  //     return new Promise((resolve, reject) => {
  //       fs.readFile(params.data.file, 'utf8', (err, content) => {
  //         if (err) return reject(err);
  //         return resolve(content);
  //       });
  //     });
  //   },
  // },

  clientQuery: () => {},

  fileChange:  (params, event) => {
      fs.watchFile(params.file, (curr, prev) => {
        fs.readFile(params.file, 'utf8', (err, content) => {
          if (err) throw new Error(`error read file: ${params.file}`);
          event(content);
        });
      });
  },

  // httpQuery:

  // httpHook:

  // emulator:

};
