/*
Send an HTTP POST request to http://localhost:8099 and pipe process.stdin into it.
Pipe the response to process.stdout.
So, the data from process.stdin is sent to the http server as a post request.
The server will respond with some data, which is printed to process.stdout
*/

var http = require('http');

// readable stream
var input = process.stdin;
// writable stream
var output = process.stdout;

// the server to send the post request to
var server_addr = 'http://localhost:8099';

// Preparation for creating the POST request
// the options for the connection with the server
var options = {
	hostname: 'localhost',
	port: 8099,
	method: 'POST'
};

// this callback is executed when the 'response' event is fired. 
// This event will be fired after a request has been sent to the server returns with some data
// response is an instance of http.IncomingMessage
function serverRespponseRecvd(response) {
	// response is an instance of http.IncomingMessage
	// it implements the Readable stream interface
	response.setEncoding('utf-8');	
	response.pipe(output);
}

// sending the actual HTTP request to the server. 
// request is instance of http.ClientRequest, which implements writable stream
var request = http.request(options, serverRespponseRecvd);

// sending data from input (readable stream) to server via request
input.pipe(request);

request.on('error', function(err) {
	console.log('problem with request sent to server: ' + err.message);
});

// request.end();
// If data is being written using i/o, (like from process.stdin, request.end cannot
// be called. This is because the request can be closed and then the stream will attempt 
// to write to it. This causes an error. 
// Same problem with closing it in serverResponseRecvd method as the response from
// server can be received before the data has been completely written.
