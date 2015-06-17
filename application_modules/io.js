// node libs
var fs = require('fs');

// 3rd party libs
var when = require('when');

/**
 * Wrapper function for node's fs.readFile - this version returns a promise instead of having a third argument as a callback
 * @param fileName - name of the file that you want to read
 * @param encoding - file encoding
 * @returns {Promise}
 */
function readFile(fileName, encoding) {
    var deferred = when.defer();
    var resolver = deferred.resolver;
    var promise = deferred.promise;

    fs.readFile(fileName, encoding, function(err, data)
        {
            if (err) {
                return console.log(err);
            }
            resolver.resolve(data);
        }
    );

    return promise;
}

/**
 * Wrapper function for node's fs.writeFile - this version returns a promise instead of having a third argument as a callback
 * @param fileName - the name of the new file
 * @param content - the content of the new file
 * @returns {Promise}
 */
function writeFile(fileName, content) {
    var deferred = when.defer();
    var resolver = deferred.resolver;
    var promise = deferred.promise;

    fs.writeFile(fileName, content, function(err, data)
        {
            if (err) {
                return console.log(err);
            }
            resolver.resolve(data);
        }
    );

    return promise;
}

/**
 * Wrapper for node's fs.unlink - this version returns a promise instead of having a second argument as a callback
 * @param fileName - the name of the file to be deleted
 * @returns {Promise}
 */
function deleteFile(fileName) {
    var deferred = when.defer();
    var resolver = deferred.resolver;
    var promise = deferred.promise;

    fs.unlink(fileName, function(err, data) {
        if (err) {
            return console.log(err);
        }
        resolver.resolve();
    });
    return promise;
}

exports.readFile = readFile;
exports.writeFile = writeFile;
exports.deleteFile = deleteFile;
