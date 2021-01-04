const path = require('path');
const slug = require('slug');
const {URL} = require('url');
module.exports = function utlToFilename(url) {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname.split('/')
      .filter((component) => component !== '')
      .map((component) => slug(component, {remove: null}))
      .join('/');
  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }
  return filename;
};
