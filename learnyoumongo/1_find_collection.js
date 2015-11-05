/*
Searching for documents in a collection.
Various other things done on the way, like connecting to a mongoDB
*/

var mongo = require('mongodb').MongoClient;

// the age filter, searching for ages greater than this
var ageCriteria = parseInt(process.argv[2]);

// this is the url that the mongo client is connecting to
// 27017 is the port number that the mongo server is listening on
// learnyoumongo is the database name 
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
	// db is used to get access to the database
	
	if (err) {
		console.log('error encountered');
		console.log(err);
		return;
	}
	
	// getting a collection
	var parrotColl = db.collection('parrots');

	// the query result is a cursor object
	parrotColl.find({age: {$gt: ageCriteria}}).toArray(function(err, parrots) {
		if (err) {
			console.log('error encountered');
			console.log(err);
			return;
		}
		
		console.log(parrots);
		
		// closing the db
		db.close();
	});
});