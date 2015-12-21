/*
Create a child process using child_process module, 
one of numerous options like spawn, fork, exec can be used for this.
The child process is created using cmd and args. 
cmd probably contains 'ls' and args the arguments with that command.

The next step is joining the stdin and stdout of the child process into a single
duplex stream.
This duplex stream is to then be returned from this file using module.exports
*/

var spawn = require('child_process').spawn;

// Duplex module is used to join a read and write stream into a duplex stream
var duplexer = require('duplexer')

module.exports = function(cmd, args) {
	// this is the process that is created to be run, cmd = dir or equivalent
	// the options are additional check reference for it
	var child = spawn(cmd, args, {
			stdio: ['pipe', 'pipe', 'pipe']
	});
	
	// combining the stdin and stdout of the the child process
	var combinedReadWriteStream = duplexer(child.stdin, child.stdout);
	return combinedReadWriteStream;
}
