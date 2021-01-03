const {EventEmitter} = require('events');
const {readFile} = require('fs');

module.exports = function grep(files, regex) {
  const emitter = new EventEmitter();

  for (const [index, file] of files.entries()) {
    readFile(file, 'utf8', (err, data) => {
      if (err) {
        emitter.emit('error', err);
      }
      emitter.emit('fileread', file, index);
      const match = data.match(regex);
      if (match) {
        match.forEach((e) => emitter.emit('found', file, e));
      }
    });
  }
  return emitter;
};

