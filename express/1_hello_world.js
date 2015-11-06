/* 
Creating an express.js app
It outputs "hello world" when a user goes to /home
The port number is provided as the first argument

Kill all node applications before running the code:
in OS X use "killall node" for this
in windows use taskkill /IM node.exe
*/

var port_number = process.argv[2];

var express = require('express');

var app = express();
app.get('/home', function(req, res) {
	res.end('hola mundo!');
});

app.listen(port_number);
