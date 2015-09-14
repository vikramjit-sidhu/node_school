/*
Connect to mongoDB on port 27017, on database learnyoumongo
Insert a document into docs collection
docuement inserted shoulde be in json format with prop:
	'firstname'
	'lastname'
these will be provided as command line arguments

JSON.stringify used to convert object to json
*/

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';

var firstName = process.argv[2];
var lastName = process.argv[3];

mongo.connect(url, function(err, db) {
	if (err) {
		console.log('error encountered');
		console.log(err);
		return;
	}
	var jsonobj = buildJSONObj(firstName, lastName);
	// console.log('jsonobj: ' + jsonobj);
	var docColl = db.collection('docs');

	docColl.insert(
		{firstname: firstName, lastname: lastName},
		function(err, result) {
			if (err) {
				console.log('error encountered');
				console.log(err);
				return;
			}
			// console.log(result);
			console.log(JSON.stringify({firstname: firstName, lastname: lastName}));
			
			// closing the database
			db.close();
		}
	);
});


// build a json object {firstname: '', lastname:  }
// converting it to json format using library
function buildJSONObj(fname, lname) {
	var obj = {};
	obj.firstname = fname;
	obj.lastname = lname;
	return JSON.stringify(obj);
}
