const express = require ('express');
const dbo = require('./model/db');

const app = express();

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/html/signup.html');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
    dbo.test();
    console.log("singed in")
});