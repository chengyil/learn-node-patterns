const {EventEmitter} = require('events');
const {readFile}= require('fs');
const {nextTick}= require('process');

module.exports = class Grep extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file) {
    this.files.push(file);
    return this;
  }
  find() {
    nextTick(() => this.emit('start', this.files));
    for (const [index, file] of this.files.entries()) {
      readFile(file, 'utf8', (err, data) => {
        if (err) {
          return this.emit('error', err);
        }
        this.emit('fileread', file, index);
        const match = data.match(this.regex);
        if (match) {
          match.forEach((ele) => this.emit('found', file, ele));
        }
      });
    }
    return this;
  }
};
