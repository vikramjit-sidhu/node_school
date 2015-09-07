/*
HTTP File server
Each request gets a text file.
Server listens on port provided by first argument
The second command line argument is the location of the file to return
*/

var http = require('http');
var fs = require('fs');

var port = process.argv[2];
var filepath = process.argv[3];

var http_server = http.createServer();

http_server.listen(port);

// this event is called when a connection request is made to server
http_server.on('request', function(req, res) {
	// creates a readable stream object, this is returned to client
	var fileReadStream = fs.createReadStream(filepath);
	
	// headers sent to client can be explicitly set or are implicit set
	res.writeHead(200, 'sending file');
	
	// write the response back to client, default encoding is utf-8
	// the callback is executed when chunk of data is flushed
	// res.write(data, 'utf-8', function() {
		// console.log('chunk of data sent to client');
	// });
	
	// this is the way to send a readable stream to a writable stream
	// by default end() is called on writable stream (res) unless specified otherwise
	fileReadStream.pipe(res, {end: false});
	
	// the end event is called when read stream is written to dest stream
	fileReadStream.on('end', function() {
		// console.log('sent data to client');
		res.end();
	});
	
	// must be called for every http ServerResponse object
	// res.end();
});