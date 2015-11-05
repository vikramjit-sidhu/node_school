/*
Sample inheritance test using the node util library.
*/

var util = require('util');

var Person = function() {
	this.canTalk = true;
	this.canPlayGTA = true;
}

var Employee = function(name, salary) {
	Person.call(this);
	this.name = name;
	this.salary = salary;
}

util.inherits(Employee, Person);
