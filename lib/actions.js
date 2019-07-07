const fs = require('fs');

module.exports = {
  readFile: (params) => {
    const content = fs.readFileSync(params.file, 'utf8');
    return content;
  },

  httpQuery: (params) => {

  },

  empty: (params, content) => {
    return content;
  }
};
