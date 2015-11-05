/*
Convert data from process.stdin to upper case data on process.stdout

In this implementation, the through2 module is used to create a transform stream
A transform stream input data, applies an operation and then produces the output data.

*/

var through2 = require('through2');

// this is a readable stream
var input = process.stdin;
// this is a writable stream
var output = process.stdout;

var transformStream = through2(transformFunc, flushFunc);

// no point in setting the encoding here, in the 
// options to through2, set decodeStrings : false
// then the chunk object will be a String
// input.setEncoding('utf-8');
input.pipe(transformStream).pipe(output)


// FUNCTIONS USED TO IMPLEMENT THE TRANSFORM STREAM

// This is the transform function used to perform some operation on 
// the data (chunk). Multiple data can be emitted from the same chunk
// using this.push(chunk)
// call the callback when the processing is done, it is possible to call
// it with an error and some data in case something went wrong.
function transformFunc(chunk, encoding, callback) {
	this.push('start of chunking new: ');
	this.push(chunk.toString().toUpperCase());
	this.push('that\'s all folks !!!! .... For now!!!');
	this.push('\n');
	this.push('\n');
	callback();
}

// In case some extra processing has to be done, at the end of the transformation
// this method is called to append some data at the end of the stream
// like in _transform, use the this.push to append data and call the
// callback when finished.
function flushFunc(callback) {
	this.push('au revoir till we meet again :\'(');
	callback();
}
