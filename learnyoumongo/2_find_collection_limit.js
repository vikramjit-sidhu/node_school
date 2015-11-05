/*
Search for documents, but only the fields which are needed.

Using a sample parrots collection, finding documents where age is 
greater than age, but only getting the name and age properties
*/

var mongo = require('mongodb').MongoClient;

// the url to connect to, learnyoumongo is the database
var url = 'mongodb://localhost:27017/learnyoumongo';

// the age of the parrots gotten must be greater than this
var ageCriteria = parseInt(process.argv[2]);

mongo.connect(url, function(err, db) {
	// db is the object used to refer to learnyoumongo db
	// console.log('connected to learnyoumongo db');

	// getting the parrot collection in db
	var parrotColl = db.collection('parrots');
	
	// querying for the parrots, the second argument is the
	// one which is used to specify the columns to be selected
	parrotColl.find(
		{age: {$gt: 3}}, 	// query criteria
		{ _id: 0, name: 1, age: 1 }	// fields to be selected
	).toArray(
		function(err, parrots) {
			if (err) {
				console.log('error encountered');
				console.log(err);
				return;
			}
			// console.log('queried parrots collection succesfully');
			console.log(parrots);
		
			// closing the connection to db
			db.close();
		}
	);
});