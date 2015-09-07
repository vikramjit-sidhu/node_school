/* Collect all data from a url (provided as cmd line input,
all the data from the server should be collected, not just 
from first data element
*/

var http = require('http');
var url = process.argv[2];

http.get(url, function(response) {
	// response is Readable Stream object
	// setting the encoding to get data in, else
	// it will come as a buffer object
	response.setEncoding('utf-8');
	// the var holding the data received by the server
	var fullData = '';
	var totLen = 0;
	
	// fullData and totLen are used from outer scope,
	// the chunks of data as they arrive are updated to them
	response.on('data', function(chunk) {
		fullData += chunk;
		totLen += chunk.length;
	});
	
	// called when there is no more data to read
	response.on('end', function() {
		console.log(totLen);
		console.log(fullData);
	});
	
});