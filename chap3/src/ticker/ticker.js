const {EventEmitter} = require('events');
const {nextTick} = require('process');

module.exports = function ticker(duration, callback) {
  const emitter = new EventEmitter();
  const timeout = setTimeout(() => {
    clearInterval(interval);
    callback();
  }, duration);
  nextTick(tick);
  const interval = setInterval(tick, 50);
  function tick() {
    const isDivisableBy5 = Date.now() % 5 === 0;
    if (isDivisableBy5) {
      emitter.emit('error');
      clearTimeout(timeout);
      clearInterval(interval);
      return callback('Divisible By 5');
    } else {
      emitter.emit('tick');
    }
  }
  return emitter;
};
