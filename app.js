const express = require ('express');
const bodyParser = require('body-parser');
const dbo = require('./model/db');

const app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/html/signup.html');
});

app.post('/newuser', (req, res) => {
    let credentials = req.body;
    console.log("credentials received");
    console.log(credentials);
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
    dbo.test();
    console.log("singed in")
});