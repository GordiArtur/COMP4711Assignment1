const GUESS_LIMIT = 7;
let current_word;
let game_status = true;
let user_score = 0;
let user_top_score = null;
let num_of_guesses = GUESS_LIMIT;
let word_choice = ["tattoo", "tree", "airplane", "hello", "electricity", "absurd", "blitz", "hangman", "razzmatazz", "azure"];
let word_hints = [
    "A form of body modification where a design is made by inserting ink.",
    "A woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground.",
    "A powered flying vehicle with fixed wings and a weight greater than that of the air it displaces.",
    "Used as a greeting or to begin a telephone conversation.",
    "Is the set of physical phenomena associated with the presence and motion of electric charge.",
    "Wildly unreasonable, illogical, or inappropriate.",
    "An intensive or sudden military attack.",
    "An executioner who hangs condemned people.",
    "Another term for razzle-dazzle.",
    "Bright blue in color, like a cloudless sky."
];
let userString = {
    emptyFieldError: "Please fill out every field",
    passwordsMustMatchError: "Passwords must match",
    passwordLengthError: "Password must be at least 6 characters long",
    userNameExistsError: "This username already exists. Pick another one",
    databaseConnectionError: "Database insert error. Please try again",
    wrongUserInputError: "Wrong username and/or password",
    alreadyLoggedInWarning: "You are already logged in",
};

// Guess word object that stores all the information about the current word in play.
function guessWord(word, hint) {
    this.word = word;
    this.hint = hint;
    this.word_arr = this.word.split('');
    this.diplayed_word = undefined;
    this.displayed_word_arr = Array(this.word.length).fill(0);
    console.log("Word \"", this.word, "\" created.");
}

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

function createUserSession(user) {
    sessionStorage.setItem('_id', user._id);
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('topScore', user.score);
}

function signOutUser() {
    sessionStorage.clear();
    window.location.href = "/";
}

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

function getUserRanks(callback) {
    $.getJSON('/userranks', (ranks) => {
        callback(ranks);
    });
}