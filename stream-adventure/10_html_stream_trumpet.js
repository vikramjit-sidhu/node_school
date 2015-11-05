/*
HTML Stream:
1. Given some html written on stdin
2. convert all inner html to upper-case for all elements with a class name of 'loud'
3. pipe all html to stdout

Trumpet and through2 used to solve this.

Trumpet is used to create a readable stream from the html content given

The elements which have a class attribute of 'loud' will be converted
to upper case using a transform stream.
The other elements are simply passed to output
*/

var trumpet = require('trumpet');
var through2 = require('through2');

// readable stream, contains html
var input = process.stdin;
// writable stream, converted html written to it.
var output = process.stdout;

// a transform stream, which transforms the input to upper case
// this transform rule is defined by the function provided as argument
var trnsformStreamUpperCase = through2(upperCaseTransformFunction);

// create a trumpet variable, it is used for the magic.
var tr = trumpet();


// select only the html elements with a classname of loud. Change their
// inner html content to upper case.
tr.selectAll('.loud', function(elem) {
	// create a readable stream of the data which is inside the html
	// element
	var readStream = elem.createStream();
	// Passing the data to a transform stream, which converts it to upper case
	// this data is passed back to the readStream, so the html content is updated
	// with the data that we want.
	readStream.pipe(trnsformStreamUpperCase).pipe(readStream);
});

// piping the input stream (html code snippet) to the transform stream
input.pipe(tr).pipe(output);


// converts the chunk it receives to upper case
function upperCaseTransformFunction(chunk, encoding, callback) {
	// chunk is a buffer object
	this.push(chunk.toString().toUpperCase());
	callback();
}
