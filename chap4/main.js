#!/usr/bin/env node

const urlToFilename = require('./src/utils');
const fs = require('fs');
const superagent = require('superagent');
const {basename, dirname} = require('path');

function spider(url, cb) {
  const filename = urlToFilename(url);
  console.log(basename(filename), dirname(filename));
  if (fs.existsSync(filename)) {
    return cb(null, filename);
  } else {
    fs.mkdir(dirname(filename), {recursive: true}, (err) => {
      if (err) {
        return cb(err);
      }
      superagent(url).end((err, response) => {
        if (err) {
          return cb(err);
        }
        fs.writeFile(filename, response.text, (err) => {
          if (err) {
            return cb(err);
          }
          cb(null, filename);
        });
      });
    });
  }
}

spider('http://patshaughnessy.net/2020/1/20/downloading-100000-files-using-async-rust', (err, filename) => {
  if (err) {
    return console.error('err', err);
  }
  console.log(fs.readFile(filename, 'utf8', (err, data) => console.log(data)));
});
