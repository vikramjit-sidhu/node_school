
var filter_files = require('./file_flter_module.js');
var dirpath = process.argv[2];
var fileext = process.argv[3];
filter_files(dirpath, fileext, main_callback);

function main_callback(err, data) {
	if (err) {
		console.log(err);
	}
	data.forEach(function(file) {
		console.log(file);
	});
}