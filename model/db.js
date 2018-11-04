const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gordiartur:asdfg@cluster0-wldfv.mongodb.net/test?retryWrites=true";

function tempTemplate(user, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            return;
        }
        const collection = db.db("asn1db").collection("asn1");
        db.close();
    });
}

function createUser(user, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            return;
        }
        const collection = db.db("asn1db").collection("asn1");

        collection.insertOne(user, (err, res) => {
            if(err) {
                console.log('Error occurred while inserting');
                callback(err, null);
            } else {
                console.log('inserted record', res.ops[0]);
                callback(null, res.ops[0]);
            }
        });

        db.close();
    });
}

function findUserByName(name, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            return;
        }
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

function findUserByyNameAndPassword(name, password, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            return;
        }
        const collection = db.db("asn1db").collection("asn1");

        collection.findOne({"name" : name, "password" : password}).then((user) => {
            if (!user) {
                callback(null);
            } else {
                callback(user);
            }
        });

        db.close();
    });
}

function updateUserScore(name, score, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            return;
        }
        const collection = db.db("asn1db").collection("asn1");

        collection.updateOne({'name': name}, {$set: {'score': parseInt(score)}}, (err) => {
            callback(err);
        });

        db.close();
    });
}

module.exports = {
    createUser, findUserByName, findUserByyNameAndPassword, updateUserScore
};