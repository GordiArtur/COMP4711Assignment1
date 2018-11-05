const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gordiartur:asdfg@cluster0-wldfv.mongodb.net/test?retryWrites=true";

// Creates a new user into the database
function createUser(user, callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            return;
        }
        const collection = db.db("asn1db").collection("asn1");

        collection.insertOne(user, (err, res) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, res.ops[0]);
            }
        });

        db.close();
    });
}

// Finds a user by name
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

// Finds a user by name and password
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

// Updates the user's score in the database
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

// Gets user score from the database
function getUserScores(callback) {
    MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
        if (err) {
            return;
        }
        const collection = db.db("asn1db").collection("asn1");

        collection.find({}, {fields:{_id: 0, password: 0}}).toArray((err, scores) => {
            callback(err, scores);
        });

        db.close();
    });
}

// Export modules
module.exports = {
    createUser, findUserByName, findUserByyNameAndPassword, updateUserScore, getUserScores
};