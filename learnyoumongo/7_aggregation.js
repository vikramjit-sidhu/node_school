/*
There is a collection named prices:
{
	name:
	size:
	price:
	quantity:
	meta: {
		vendor:
		location:
	}
}
Calculate the average price for all documents in collection.
Print the average rounded up to 2 places
*/

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, function(err, db) {
	if (err) {
		console.log('error encountered');
		console.log(err);
		return;
	}
	
	// the collection to query
	var priceColl = db.collection('prices');
	
	
	// the query only contains the group stage as the match is not required
	// $avg is a special operation which calculates the average of all the values
	// passed to it.
	// a field value is referred to using the $ operator..
	// to refer to the price field, use $price
	priceColl.aggregate([
			{$group: {_id: 'All products', averagePrice: {$avg: '$price'}} }
	]).toArray(function(err, results) {
		if (err) {
			console.log('error encountered');
			console.log(err);
			return;
		}
		console.log(Math.round(results[0].averagePrice).toFixed(2));
		
		// closing the db
		db.close();
	});
	
});