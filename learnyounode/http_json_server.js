/*
HTTP JSON API server
Server on receiving GET request /api/parsetime sends back json response of time
eg:
request:
/api/parsetime?iso=2013-08-10T12:10:15:474
response:
{
"hour": 14,
"minute":23,
"second":15
}

another type of request,
/api/unixtime?..
response:
{ "unixtime" : 121321432566574324 }
*/

var http = require('http');
var url = require('url');

var PORT = process.argv[2];

var http_server = http.createServer();

http_server.listen(PORT);

http_server.on('request', function(req, res) {
	if (req.method != 'GET') {
		res.end('Send only GET request');
		return;
	}
	// the url of the request
	// eg. if request is GET /status?name=ryan
	// this parses url into an object, which can be read, 
	// the true is passed so that the params from the query 
	var requrl = url.parse(req.url, true);
	var path = requrl.pathname; // this is /api/parsetime
	var payload = requrl.query.iso;	// this is in format of a date

	var date = new Date(payload);

	//json object sent back as response
	var responseObj = {};
	
	if (path == '/api/parsetime') {
		// sending json response as specified in docstring
		responseObj.hour = date.getHours();
		responseObj.minute = date.getMinutes();
		responseObj.second = date.getSeconds();
	}
	else if (path == '/api/unixtime') {
		responseObj.unixtime = Date.parse(date);
	}
	else {
		res.end('Invalid url, not recognized');
		return;
	}
	var jsonResponse = convertObjToJson(responseObj);
	// setting the header
	setJSONHeader(res);
	res.write(jsonResponse);
	res.end();
});


// set header of the http ServerResponse object
// the header is set to application/json
function setJSONHeader(res) {
	res.writeHead(200, 'Returning JSON date object',
		{
			'Content-type' : 'application/json'
		}
	);
}

// given a javascript object, convert it to a 
// json object
function convertObjToJson(obj) {
	return (JSON.stringify(obj));
}