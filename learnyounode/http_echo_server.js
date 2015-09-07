/*
HTTP Upper-case echo server
Create an HTTP server which receives POST requests, converts
the request body characters to upper-case and returns it
*/

var http = require('http');

var PORT = process.argv[2];

var http_server = http.createServer();

http_server.listen(PORT);

http_server.on('request', function(req, res) {
	// req contains the post request sent to server
	// it is a readable stream object
	
	// the variable holding the data sent from the request
	var fullData = '';
	
	req.setEncoding('utf-8');
	req.on('data', function(chunk) {
		fullData += chunk.toString();
	});
	req.on('end', function() {
		// now sending all the data back to the client,
		// with text capitalised
		setHeadersForResponse(res);
		echoDataBack(res, fullData);
	});
});


function setHeadersForResponse(res) {
	res.writeHead(200, 'capitalized data echoed back');
}

function echoDataBack(res, data) {
	res.write(data.toUpperCase(), 'utf-8', function() {
		console.log('data sent to client');
	});
	res.end();
}
