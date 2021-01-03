const grep = require('./grepFn');
const Grep = require('./grepClass');

module.exports = {
  grep,
  Grep,
  run() {
    const grepItem = new Grep(/hello .*/g);
    grepItem.addFile('./data/fileA.txt')
        .addFile('./data/fileB.txt')
        .find()
        .on('start', (files) => console.log(`grep started on files ${files}`))
        .on('fileread', (file, index) => {
          console.log(`${index} : ${file} was read`);
        })
        .on('found', (file, match) => {
          console.log(`Matched ${match} in ${file}`);
        })
        .on('error', (err) => console.error(`Unable to gre due tp ${err}`));
    console.log('done');
  },
};
