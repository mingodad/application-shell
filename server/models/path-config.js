var fs = require('fs');
var path = require('path');

var pathConfigs = {
  '/': {
    view: 'index',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: ['https://fonts.googleapis.com/css?family=Roboto:' +
      '400,300,700,500,400italic'],
    remoteScripts: ['/scripts/static-page.js']
  },
  '/url-1': {
    view: 'url-1',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: ['https://fonts.googleapis.com/css?family=Roboto:' +
      '400,300,700,500,400italic'],
    remoteScripts: ['/scripts/static-page.js']
  },
  '/url-2': {
    view: 'url-2',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: ['https://fonts.googleapis.com/css?family=Roboto:' +
      '400,300,700,500,400italic'],
    remoteScripts: ['/scripts/static-page.js']
  },
  '/app-shell': {
    view: '',
    inlineStyles: getFileContents(['/styles/core.css']),
    remoteStyles: ['https://fonts.googleapis.com/css?family=Roboto:' +
      '400,300,700,500,400italic'],
    remoteScripts: ['/scripts/core.js']
  }
};

function getFileContents(files) {
  // Concat inline styles for document <head>
  var flattenedContents = '';
  var pathPrefix = '/../../dist/';
  files.forEach(function(file) {
    flattenedContents += fs.readFileSync(path.resolve(__dirname) +
      pathPrefix + file);
  });

  return flattenedContents;
}

module.exports = {
  getConfig: function(urlPath) {
    var object = pathConfigs[urlPath];

    // Check if the path is actually valid.
    if (!object) {
      return null;
    }

    // This needed to ensure changes made to the objects dont stick / alter
    // the original object
    return Object.create(object);
  }
};
