/* 
Given 3 URLs as command line arguments, getting data
from them and printing them to the console.
The catch is that the data must be printed sequentially, 
i.e. first the data from url1 followed by data from url2
and so on.
*/

var http = require('http');
// the number of urls from which data is fetched
var NUM_URLS = 3;

// the urls array from which the data is obtained
var urls = [];

// the index starts from 2, as index 0, 1 are 
// the command and the filename
for (var i=2; i < (NUM_URLS + 2); i++) {
	urls.push(process.argv[i]);
}

// the current url index which has to be fetched
var currUrlIndex = 0;

//run the program
readUrlData();


// Read data from a url, which is read from global variable array 'urls'
// the data fetched from the url is put into another
// global variable, 'serversData'
function readUrlData() {
	var url = null;
	// all the urls have been fetched, returning back
	if (currUrlIndex >= urls.length) {
		return;
	}
	// reading current url and incrementing url index, both
	// are global variables
	else {
		url = urls[currUrlIndex];
		currUrlIndex++;
	}
	http.get(url, function(response) {
		var reqData = '';
		response.setEncoding('utf-8');
		response.on('data', function(chunk) {
			reqData += chunk;
		});
		
		response.on('end', function() {
			console.log(reqData);
			readUrlData();
		});
	});
}
