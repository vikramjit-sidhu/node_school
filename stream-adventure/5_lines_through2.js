/*
From stdin getting data, and writing to stdout.
Convert even numbered lines to upper case and odd-numbered lines to lower-case
Using 2 transform streams to achieve this, one will convert the input stream
and break it according to newlines, and the other will convert alternate lines to upper case
*/

var through2 = require('through2');

// this is a readable stream
var input = process.stdin;
// this is a writable stream
var output = process.stdout;

var splitNewlinesStream = through2(splitNewLinesTransform);

var convertAltUpperCase = through2(convertAltUpperCase);

input.pipe(splitNewlinesStream).pipe(convertAltUpperCase).pipe(output);


// FUNCTIONS FOR THE STREAMS PROTOTYPE METHODS

// this function takes the input, splits it according to the newline and 
// passes each line as output
function splitNewLinesTransform(chunk, encoding, callback) {
	// chunk is a Buffer object 
	var lines = chunk.toString().split('\n');
	// pushing each of the new line chunks as output
	for (var i=0; i<lines.length; i++) {
		this.push(lines[i] + '\n');
	}
	callback();
}


var lineNumber = 1;
// this function converts the alternate chunks it receives to upper case 
// and sends it further on
// the line numbers are kept track of using a global variable
function convertAltUpperCase(chunk, encoding, callback) {
	// even line number, convert to upper case and send
	if ((lineNumber%2) == 0) {
		this.push(chunk.toString().toUpperCase() + '\n');
	} 
	// odd line number, convert to lower case
	else {
		this.push(chunk.toString().toLowerCase() + '\n');
	}
	// a new line has to be pushed after each chunk, thats just the way it is
	lineNumber++;
	callback();
}
