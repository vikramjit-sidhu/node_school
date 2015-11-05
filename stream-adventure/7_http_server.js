/*
Creating an HTTP sever which writes back the request stream as upper-case 
response data for POST requests.
Using a through stream to achieve this
*/

var http = require('http')
var through2 = require('through2');

// CREATING A TRANSFORM STREAM
var transformStreamUpper = through2(transformUpperCase);


// the port number for the server to listen on
var port_number = process.argv[2];

// the argument (httpServerRequest) given 
// is automatically added to the 'request' event of the server
var server = http.createServer(httpServerRequest);

server.listen(port_number);

// this function is called each time the server it is associated with emits a 
// 'request' event.
// it converts the data obtained from request to upper case and sends it as a response
// the data is converted only for POST data.
function httpServerRequest(request, response) {
	if (request.method == 'POST') {
		request.pipe(transformStreamUpper).pipe(response);
	}
}


// This is the transform function for the stream that gets the http request stream data,
// converts it to upper case and sends it back to response stream
function transformUpperCase(chunk, encoding, callback) {
	// chunk is the data obtained as a buffer object
	var chunkStr = chunk.toString();
	this.push(chunkStr.toUpperCase());
	callback();
}