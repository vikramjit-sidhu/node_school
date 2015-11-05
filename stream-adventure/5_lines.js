/*
From stdin getting data, and writing to stdout.
Convert even numbered lines to upper case and odd-numbered lines to lower-case
*/

// stdin, readable stream
var stdin = process.stdin;
// stdout writable stream
var stdout = process.stdout;


var lineCount = 1;
// the format the data is received in
stdin.setEncoding('utf-8');
stdin.on('data', function(chunk) {
	var lines = chunk.split('\n');
	for (var i=0; i<lines.length; i++) {
	//TODO extra \n appearing in input stream
		console.log('line #: ' + lineCount);
		console.log(lines[i]);
		lineCount++;
		// if ((lineCount % 2) == 0) {
			// stdout.write(lines[i].toUpperCase());
		// }
		// else {
			// stdout.write(lines[i].toLowerCase());
		// }
		// stdout.write('\n');
		// ++lineCount;
	}
});