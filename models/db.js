const mongodb = require('mongodb');

const client = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

const options = { useUnifiedTopology: true};

const databaseName = 'bids';

const database = {

    /* CREATE DATABASE */
    createDatabase: function() {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            console.log(databaseName + 'Database created!');
            db.close();
        });
    },

    /* CREATE COLLECTION */
    createCollection: function(collection) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(databaseName);

            database.createCollection(collection, function(err, res) {
                if(err) throw err;
                console.log('Collection created');
                db.close();
            });
        });
    },



    /// CREATE ///

    /* INSERT ONE DOCUMENT INTO COLLECTION */
    insertOne: function(collection, doc) {
        client.connect(url, options, function(err, db) {
            if (err) throw err;

            var database = (db.db(databaseName));
            database.collection(collection).insertOne(doc, function (err, res) {
                if(err) throw err;
                console.log('Document inserted in ' + collection);
                console.log(doc);
                db.close();
            });
            
        });
    },



    /// READ ///

    /* FIND A DOCUMENT FROM A COLLECTION */
    findOne: function(collection, query, callback) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(databaseName);

            database.collection(collection).findOne(query, function(err, res) {
                if(err) throw err;
                console.log(res);
                db.close();
                return callback(res);
            });
        });
    },

    /* FIND MULTIPLE DOCUMENTS FROM A COLLECTION */
    findMany: function(collection, query, sort=null, projection=null, callback) {
        client.connect(url, options, function(err, db) {
            if(err) throw err;
            var database = db.db(databaseName);

            database.collection(collection).find(query, {projection: projection})
            .sort(sort).toArray(function(err, res) {
                if(err) throw err;
                console.log(res);
                db.close();
                return callback(res);
            });
        });
    },
    


    /// UPDATE ///

    /* UPDATE A DOCUMENT */

    // hi robi hehehe



    /// DELETE ///

    /* DELETE A DOCUMENT */

    // hi robi hehehe
};

module.exports = database;