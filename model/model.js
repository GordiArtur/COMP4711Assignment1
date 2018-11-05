const GUESS_LIMIT = 7;
let current_word;
let game_status = true;
let user_score = 0;
let user_top_score = null;
let num_of_guesses = GUESS_LIMIT;
let debug = true;

// Guess word object that stores all the information about the current word in play.
function guessWord(word, hint) {
    this.word = word;
    this.hint = hint;
    this.word_arr = this.word.split('');
    this.diplayed_word = undefined;
    this.displayed_word_arr = Array(this.word.length).fill(0);
    if (debug) {
        console.log(`Word ${this.word} created.`);
    }
}

// Handles sign up request
function signUp(userName, pass, callback) {
    let credentials = {
        name: userName,
        password: pass,
        score: 0
    };
    credentials = JSON.stringify(credentials);

    $.ajax({
        type: 'POST',
        data: credentials,
        contentType: 'application/json',
        url: '/newuser',
        success: (response) => {
            if (response.err === null) {
                createUserSession(response.user);
                callback(null);
            } else if (response.err === "duplicate_err") {
                console.log(userString.userNameExistsError);
                callback(userString.userNameExistsError);
            } else {
                console.log(userString.databaseConnectionError);
                callback(userString.databaseConnectionError);
            }
        }
    });
}

// Handles login request
function logIn(userName, pass, callback) {
    let credentials = {
        name: userName,
        password: pass
    };
    credentials = JSON.stringify(credentials);

    $.ajax({
        type: 'POST',
        data: credentials,
        contentType: 'application/json',
        url: '/loginuser',
        success: (response) => {
            if (response.err === null) {
                createUserSession(response.user);
                callback(null);
            } else {
                console.log(userString.wrongUserInputError);
                callback(userString.wrongUserInputError);
            }
        }
    });
}

// Creates a logged in user session
function createUserSession(user) {
    sessionStorage.setItem('_id', user._id);
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('topScore', user.score);
}

// Signs out user by clearing up the user session
function signOutUser() {
    sessionStorage.clear();
    window.location.href = "/";
}

// Handles storing user's score request
function storeUserTopScore() {
    sessionStorage.setItem('topScore', user_top_score);
    let jsonFile = JSON.stringify({
        'user': sessionStorage.getItem('name'),
        'score': user_top_score
    });

    $.ajax({
        type: 'POST',
        data: jsonFile,
        contentType: 'application/json',
        url: '/updatescore',
        success: (response) => {
            if (response.err !== null) {
                console.log("Database score update error");
            } else {
                console.log("Score updated");
            }
        }
    });
}

// Handles getting user's ranks request
function getUserRanks(callback) {
    $.getJSON('/userranks', (ranks) => {
        callback(ranks);
    });
}