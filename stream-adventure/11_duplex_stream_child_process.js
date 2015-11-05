/*
Create a child process using child_process module, 
one of numerous options like spawn, fork, exec can be used for this.
The child process is created using cmd and args. 
cmd probably contains 'ls' and args the arguments with that command.

The next step is joining the stdin and stdout of the child process into a single
duplex stream.
This duplex stream is to then be returned from this file using module.exports
*/

// This is the module which is required to create a new process
var spawn = require('child_process').spawn;


// this is exported for a function to call
module.exports = function(cmd, args) {
	// this is the process that is created to be run, cmd = dir or equivalent
	// args are the additional arguments associated with it
	// the options are additional check reference for it
	var child = spawn(cmd, args), {
			stdio: ['pipe', 'pipe', 'pipe']
	});
	
	// combining the stdin and stdout of the the child process
	

	
}
