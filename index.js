#! /usr/bin/env node

// application modules
var io = require('./application_modules/io.js')
var fileLoader = require('./application_modules/fileLoader.js');

// 3rd party libs
var when = require('when');
var parser = require('subtitles-parser');

var inputFileName = process.argv[2];
var outputFileName = process.argv[3];

// perform all io reads simultaneously at startup so the rest of the execution can be as
// synchronous as possible and we can avoid callback hell as much as possible
when.join(
    fileLoader.loadFile(inputFileName)
).then(getSrt)

function getSrt() {
    var srtData = fileLoader.getLoadedFile();
    var jsonData = parser.fromSrt(srtData);
    io.writeFile(outputFileName, JSON.stringify(jsonData));
}
