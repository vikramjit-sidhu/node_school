var url = process.argv[2];
var http = require('http');

http.get(url, function(response) {
	// console.log(response.headers);
	// response is an object of type Readable Stream
	// response.setEncoding('utf-8');
	
	// The data event explicitly converts the stream from chunked
	// mode to flowing mode, this method is called each time there is 
	// some data to read
	response.on('data', function(buf) {
		// buf is an object of type Buffer
		console.log(buf.toString());
	});
	response.on('error', console.error);
});
