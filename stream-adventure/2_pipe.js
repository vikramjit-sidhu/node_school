/*
Given a file as the first argument to program.
Creating a createReadStream to pipe the given file to stdout
*/

var fs = require('fs');

// the filename of the file to be read
var filename = process.argv[2];

// creates a Readable Stream object
var readStream = fs.createReadStream(filename);

// Writing the data to a destination writable stream object, stdout
// Flow of data is managed
readStream.pipe(process.stdout);