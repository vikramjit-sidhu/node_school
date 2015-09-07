
var fs = require('fs');
var path = require('path');

module.exports = filteredFileList;

function filteredFileList(dirpath, extpath, callback) {
	fs.readdir(dirpath, function succRead(err, data) {
		if (err) {
			return callback(err);
		}
		extpath = '.' + extpath;
		var file_list = data.filter(function(file) {
			if (path.extname(file) == extpath) {
				file_list.push(file);
			}
		});
		callback(null, file_list);
	});
};