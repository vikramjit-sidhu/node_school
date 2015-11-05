/*
Given text on stdin, buffer the text received and reverse it.

In this solution, simply using the methods in the read stream and the write stream
to implement the solution
The data obtained from readable stream is stored in a buffer object
*/

// this is a readable stream
var input = process.stdin;
// this is a writable stream
var output = process.stdout;

// this variable will hold the data that is sent from input stream
// initially it is declared with null type, but eventually it will be 
// an object of Buffer type.
var fullDataBuf = new Buffer(0);

// the readable stream is now turned 'on', data is continuously obtained from it
input.on('data', function(chunk) {
	fullDataBuf = new Buffer(fullDataBuf + chunk);
});

// end of data from readable stream
input.on('end', function() {
	// using a hack to reverse the string, first converting it to an array,
	// reversing it and then concatenating it using the join method
	output.write(fullDataBuf.toString().split('').reverse().join(''));
});


