const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gordiartur:asdfg@cluster0-wldfv.mongodb.net/test?retryWrites=true";

function tempTemplate(user, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        const collection = db.db("asn1db").collection("asn1");
        db.close();
    });
}

function createUser(user, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        const collection = db.db("asn1db").collection("asn1");

        collection.insertOne(user, (err, res) => {
            if(err) {
                console.log('Error occurred while inserting');
                callback(err);
            } else {
                console.log('inserted record', res.ops[0]);
                callback(null);
            }
        });

        db.close();
    });
}

function findUser(name, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        const collection = db.db("asn1db").collection("asn1");

        collection.findOne({"name" : name}).then((user) => {
            if (!user) {
                callback(null);
            } else {
                callback(user);
            }
        });

        db.close();
    });
}

module.exports = {
    createUser, findUser
};