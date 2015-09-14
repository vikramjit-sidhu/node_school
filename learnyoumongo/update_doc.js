/*
Updating a document in users collection
Database is available in process.argv[2]
{
	name: Tina
	age: 30
	username: tinatime
}
Change Tina's age from 30 to 40
Assume username is unique
*/

var mongo = require('mongodb').MongoClient;

var database = process.argv[2];

var url = 'mongodb://localhost:27017/' + database;

// the userid to search documents by
var userid = 'tinatime';
// the new age to be updated in collection
var newAge = 40;

mongo.connect(url, function(err, db) {
	if (err) {
		console.log('error encountered');
		console.log(err);
		return
	}
	
	// getting the collection
	var userColl = db.collection('users');
	
	userColl.update(
		{ username: userid },	// the query to find documents by
		{ $set: {age: newAge} },
		function(err, result) {
			if (err) {
				console.log('error encountered');
				console.log(err);
				return
			}
			// console.log(result);
			// closing the connection to db
			db.close();
		}
	);
});
