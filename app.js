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
    console.log(credentials);
    let error = "";
    dbo.findUser(credentials.name, (user) => {
        if (!user) {
            dbo.createUser(credentials, (err) => {
                if (!err) {
                    // log in
                } else {
                    error = "db_err";
                }
            });
        } else {
            error = "duplicate_err";
        }
        res.send(error);
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app now listening for requests on port ${process.env.PORT || 3000}`);
});