/*
Creating a readable stream
*/

// The data which the read stream gives
var readStreamData = 'All that is gold does not glitter, \
    Not all those who wander are lost; \
    The old that is strong does not wither, \
    Deep roots are not reached by the frost. \
	\
    From the ashes a fire shall be woken, \
    A light from the shadows shall spring; \
    Renewed shall be blade that was broken, \
    The crownless again shall be king.';

var Readable = require('stream').Readable;
var util = require('util');

util.inherits(ReadStream, Readable);

function ReadStream(data) {
	Readable.call(this);
	this._data = data;
}

ReadStream.prototype._read = function() {
	var lines = readStreamData.split(/[,;.]/);
	for (var i=0; i< lines.length; i++) {
		this.push(new Buffer(lines[i], 'utf-8'));
		this.push('\n');
	}
	this.push(null);
}

var readStr = new ReadStream(readStreamData);

readStr.pipe(process.stdout);