const {readFile} = require('fs');
const process = require('process');

module.exports = {
  readJSON(filename, cb) {
    readFile(filename, 'utf8', (err, data) => {
      let parsed;
      if (err) {
        return cb(err);
      }
      try {
        parsed = JSON.parse(data);
      } catch (err) {
        return cb(err);
      }
      cb(null, parsed);
    });
  },
  filename() {
    return process.argv[2];
  },
  run() {
    if (this.filename()) {
      this.readJSON(this.filename(), (err, data) => {
        if (err) {
          console.error(err);
          console.log('done');
          process.exit(-1);
        } else {
          console.log(data);
        }
      });
    }
  },
};
