const express = require ('express');
const dbo = require('./model/db');

const app = express();

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});