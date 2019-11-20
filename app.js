/*
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	client.close();
})
*/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the server
client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected correctly to server");
	const db = client.db(dbName);
	indexCollection(db, function() {
		findDocuments(db, function() {
			client.close();
		});
	});
});
/* 
client.connect(function(err) {
	assert.equal(null, err);
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	insertDocuments(db, function() {
		client.close();
	});
});
*/


const insertDocuments = function(db, callback) {
// Get the documents collection
const collection = db.collection('documents');
// Insert some documents
	collection.insertMany([
		{a : 1}, {a : 2}, {a : 3}], 
		function(err, result) {
			assert.equal(err, null);
			assert.equal(3, result.result.n);
			assert.equal(3, result.ops.length);
			console.log("Inserted 3 documents into the collection");
			callback(result);
		}
	);
};


const findDocuments = function(db, callback) {
// Get the documents collection
const collection = db.collection('documents');
// Find some documents
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs)

		callback(docs);
	});
}

const updateDocument = function(db, callback) {
	const collection = db.collection('documents');
	collection.updateOne({a:2}, {$set:{b:1}}, 
		function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log("Updated the document with a equal to 2");
			callback(result);
		}
	);  
}

const removeDocument = function(db, callback) {
	const collection = db.collection('documents');
	collection.deleteOne({ a : 3 }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});    
}


const indexCollection = function(db, callback) {
	db.collection('documents').createIndex(
		{ "a": 1 },
		null,
		function(err, results) {
			console.log(results);
			callback();
		}
	);
};



