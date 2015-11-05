/*
Write browser code that uses the websocket stream module to print 'hello\n' to browser
*/

// the websocket stream
var websocket = require('websocket-stream');

// this is the websocket stream, it is a duplex stream 
// this is used for communication between server and browser
var websocket_stream = websocket('ws://localhost:8099');


// this code runs on the broswer, so the write of the stream, sends data to the 
// web server. the console.log writes data onto the console in the browser.
websocket_stream.write('hello\n', 'utf-8', function() {
	console.log('data sent, this should print in browser');
});