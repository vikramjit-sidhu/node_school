/*
Database name is passed as first command line argument (process.argv[2])
Collection name is passed as second command line argument (process.argv[3])
ID is third command line argument

Remove the collection with given id
*/

var mongo = require('mongodb').MongoClient;

var databaseName = process.argv[2];
var collectionName = process.argv[3];
var id = process.argv[4];

var url = 'mongodb://localhost:27017/' + databaseName;

mongo.connect(url, function(err, db) {
	if (err) {
		console.log('error encountered');
		console.log(err);
		return;
	}
	
	var coll = db.collection(collectionName);
	
	coll.remove(
		{_id: id},
		function(err, res) {
			if (err) {
				console.log('error encountered');
				console.log(err);
				return;
			}
			db.close();
		}
	);
	
});