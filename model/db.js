const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyCtQOCI-3B_INDuI0m4LCM3nDTadT6CzqQ",
    authDomain: "webasn3-98dfc.firebaseapp.com",
    databaseURL: "https://webasn3-98dfc.firebaseio.com",
    projectId: "webasn3-98dfc",
    storageBucket: "",
    messagingSenderId: "480492952855"
};

firebase.initializeApp(config);

function createUser(user, pass, callback) {
    firebase.auth().createUserWithEmailAndPassword(user, pass).catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        console.log("\nerror:");
        console.log(errorCode);
        console.log(errorMessage);

        callback(errorCode, errorMessage);
    });
    callback(null, null);
}

module.exports = {
    createUser
};