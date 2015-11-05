var fs = require('fs');
var filepath = process.argv[2];

readFile(filepath, printVar);

function readFile(filepath, callback) {
	fs.readFile(filepath, 'utf-8', function readDone(err, data) {
		if (err) {
			console.log(err);
			return;
		}
		callback(data.split('\n').length-1);
	});
}
	
function printVar(var_print) {
	console.log(var_print);
}