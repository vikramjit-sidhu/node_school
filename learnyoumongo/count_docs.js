/*
Count number of documents that meet certain criteria
User parrots collection to find all docs where age is
greater than first argument passed
*/

var mongo = require('mongodb').MongoClient;

// count the number of parrots whose age is greater than this
var ageCriteria = parseInt(process.argv[2]);

// url that mongoDB server is running on
var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
	if (err) {
		console.log('error encountered');
		console.log(err);
		return;
	}
	// console.log(db);
	// parrot collection, which is counted
	var parrotColl = db.collection('parrots');

	parrotColl.count(
		{age: {$gt: ageCriteria} },
		function(err, cnt) {
			if (err) {
				console.log('error encountered');
				console.log(err);
				return;
			}
			console.log(cnt);
			
			// closing the db
			db.close();
		}
	);
});