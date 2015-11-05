/*
Take data from process.stdin and pipe it to process.stdout
*/

// process.stdin is a Readable Stream
// process.stdout is a Writable Stream
// Simply piping the value from input stream to output stream
process.stdin.pipe(process.stdout);