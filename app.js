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
    let error = "";
    let response = null;
    dbo.findUserByName(credentials.name, (user) => {
        if (!user) {
            dbo.createUser(credentials, (err, usr) => {
                if (!err) {
                    response = {
                        'err': null,
                        '_id': usr._id,
                        'name': usr.name
                    };
                    res.send(response);
                } else {
                    error = "db_err";
                    response = {
                        'err': error,
                    };
                    res.send(response);
                }
            });
        } else {
            error = "duplicate_err";
            response = {
                'err': error,
            };
            res.send(response);
        }
    });
});

app.post('/loginuser', (req, res) => {
   let credentials = req.body;
   let error = "";
   let response = null;
   dbo.findUserByyNameAndPassword(credentials.name, credentials.password, (user) => {
       if (!user) {
           error = "no_user";
           response = {
               'err': error,
           };
       } else {
           response = {
               'err': null,
               '_id': user._id,
               'name': user.name
           };
       }
       res.send(response);
   });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app now listening for requests on port ${process.env.PORT || 3000}`);
});