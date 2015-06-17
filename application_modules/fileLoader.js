/**
 * Created by eric on 15/03/2015.
 */

var io = require('./io.js');

// 3rd party libs
var when = require('when');

var loadedFile;

/**
 * Loads the file with the given filename and returns a promise
 * After the promise is resolved, the file content can be retrieved with getLoadedFile(
 * @param fileName - the filename to be loaded
 * @returns {Promise}
 */
function loadFile(fileName) {
    var deferred = when.defer();
    var resolver = deferred.resolver;
    var promise = deferred.promise;

    io.readFile(fileName, 'utf8').then(function(data) {
        loadedFile = data;
        resolver.resolve();
    });

    return promise;
}

/**
 * Returns the file that was loaded with loaded with loadFile
 * @returns string
 */
function getLoadedFile() {
    return loadedFile;
}

exports.loadFile = loadFile;
exports.getLoadedFile = getLoadedFile;
