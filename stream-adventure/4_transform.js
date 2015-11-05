/*
Convert data from process.stdin to upper case data on process.stdout

This implementation simply takes the data from process.stdin (readable stream),
converts it to upper case and then writes it to the process.stdout (writable stream)
Additionally a check is done to see if the writable stream is being overwhelmed with data
(not Tested)
*/

// this is a readable stream
var input = process.stdin;
// this is a writable stream
var output = process.stdout;

input.setEncoding('utf-8');
input.on('data', function(chunk) {
	// this method returns true if there is no buffering
	// it returns false if data had to be buffered, ideally you
	// should wait for 'drain' event before writing to it again.
	var canGetMoreData = output.write(chunk.toUpperCase());
	// checking if the writable stream is clogged up, if so, the input
	// stream has to be paused
	if (!canGetMoreData) {
		input.pause();
	}
});

// the writable stream has been unclogged, safe to write to it again.
// NOTE: the chunk that caused it to be clogged, does it need to be written again?
output.on('drain', function() {
	input.resume();
});

