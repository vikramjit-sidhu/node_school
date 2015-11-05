/*
From stdin getting data, and writing to stdout.
Convert even numbered lines to upper case and odd-numbered lines to lower-case
Using split module to get the chunks of data split according to newline, and then
using a transform stream to convert the required lines to upper/ lower case
*/

var through2 = require('through2');
var split = require('split');

// this is a readable stream
var input = process.stdin;
// this is a writable stream
var output = process.stdout;

// this is a transform stream, which calls the function given as argument
// for each chunk of data it receives
var transformLines = through2(convertLinesUpperAndLower);

input.pipe(split()).pipe(transformLines).pipe(output);


var lineNumber = 1;
// this function converts the alternate chunks it receives to upper case, 
// rest to lower case
// and sends it further on
// the line numbers are kept track of using a global variable
function convertLinesUpperAndLower(chunk, encoding, callback) {
	// even number lines to upper case
	if ((lineNumber % 2) == 0) {
		this.push(chunk.toString().toUpperCase() + '\n');
	} 
	else {
		this.push(chunk.toString().toLowerCase() + '\n');
	}
	lineNumber++;
	callback();
}