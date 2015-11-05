/*
Convert data from process.stdin to upper case data on process.stdout

In this implementation, creating a transform stream the old fashioned way... using classes!

A transform stream input data, applies an operation and then produces the output data.
*/

var util = require('util');

var Transform = require('stream').Transform;

// this is a readable stream
var input = process.stdin;
// this is a writable stream
var output = process.stdout;

// A transform stream which converts the characters from a 
// readable stream into upper case
var UpperTransform = function (options) {
	Transform.call(this, options);
}

// inherits the prototype methods from one constructor to another
// the protoype methods of UpperTransform will be set to a new object created from Transform
util.inherits(UpperTransform, Transform);

// setting up the methods that the transform stream has to implement
UpperTransform.prototype._transform = transformFunc;
UpperTransform.prototype._flush = flushFunc;


var upperStream = new UpperTransform();

// gettint the input and piping to output
input.pipe(upperStream).pipe(output);



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
	this.push('au revoir, until till we meet again :\'(');
	callback();
}