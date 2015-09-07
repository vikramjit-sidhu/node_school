/* 
Creating a TCP Server which on an incoming request 
inputs the current date and time in 24 hour format; 'yyyy-mm-dd hh:mm'

*/

var net = require('net');

// the port that the tcp server is listening on
var PORT = process.argv[2];

var tcp_server = net.createServer();

// making the tcp server listen on a particular port, 
// by default the host it listens to is localhost
tcp_server.listen(PORT, function() {
	// console.log('tcp server up');
});

// listening for the connection event 
tcp_server.on('connection', function(socket) {
	// current system date
	var date = new Date();
	// print the date in a format 'yyyy-mm-dd hh:mm'
	var formatDate = date.getFullYear().toString() + '-' + zeroFill(date.getMonth()+1) + '-' +
			zeroFill(date.getDate()) + ' ' + zeroFill(date.getHours()) + ':' + 
			zeroFill(date.getMinutes());
	socket.setEncoding('utf-8');
	socket.write(formatDate);
	socket.write('\n');
	socket.end();
});

// get a number and return a string which is 
// zero filled, if needed
// eg. if 4 is passed, return '04'
// if 10 is passed, return '10'
function zeroFill(number) {
	return (number < 10 ? ('0' + number) : number.toString());
}
