/*
Given text on stdin, buffer the text received and reverse it.

Use the concat-stream module to buffer the data, 
it calls a method once all the data is buffered.
*/


// this is a readable stream
var input = process.stdin;
// this is a writable stream
var output = process.stdout;

var concat = require('concat-stream');

var concat_stream = concat(gotDataBuf);

// get data from input readable stream, into the concat stream
// the data will be read in chunks and buffered.
input.pipe(concat_stream);

// the function that is called once the concat-stream has buffered all
// the data from the input stream
function gotDataBuf(dataBuf) {
	output.write(dataBuf.toString().split('').reverse().join(''));
}