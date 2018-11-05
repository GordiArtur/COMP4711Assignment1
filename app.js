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

app.get('/userranks', (req, res) => {
    dbo.getUserScores((err, scores) => {
        if (!err) {
            res.send(JSON.stringify(scores));
        } else {
            res.send({
                'err': "db_err"
            })
        }
    })
});

app.post('/newuser', (req, res) => {
    let credentials = req.body;
    let response = null;
    dbo.findUserByName(credentials.name, (existingUser) => {
        if (!existingUser) {
            dbo.createUser(credentials, (err, user) => {
                if (!err) {
                    response = {
                        'err': null,
                        'user': user
                    };
                    res.send(response);
                } else {
                    response = {
                        'err': "db_err"
                    };
                    res.send(response);
                }
            });
        } else {
            response = {
                'err': "duplicate_err"
            };
            res.send(response);
        }
    });
});

app.post('/loginuser', (req, res) => {
   let credentials = req.body;
   let response = null;
   dbo.findUserByyNameAndPassword(credentials.name, credentials.password, (user) => {
       if (!user) {
           response = {
               'err': "no_user"
           };
       } else {
           response = {
               'err': null,
               'user': user
           };
       }
       res.send(response);
   });
});

app.post('/updatescore', (req, res) => {
    let score = req.body;
    let response = null;
    dbo.updateUserScore(score.user, score.score, (err) => {
        if (!err) {
            response = {
                'err': null
            };
        } else {
            response = {
                'err': "score_update_err"
            }
        }
        res.send(response);
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app now listening for requests on port ${process.env.PORT || 3000}`);
});