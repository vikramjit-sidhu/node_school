var fs = require('fs');
var path = require('path');
var dirPath = process.argv[2];
var fileExt = process.argv[3];
fileExt = '.' + fileExt;

function readParticularFiles(dirPath, fileExt, print_callback) {
	fs.readdir(dirPath, function succRead(err, data) {
		if (err) {
			print_callback(err);
			return;
		}
		data.filter(function(file) {
			if (path.extname(file) == fileExt) {
				print_callback(file);
			}
		});
	});
}

function Log(var_name) {
	console.log(var_name);
}

readParticularFiles(dirPath, fileExt, Log);