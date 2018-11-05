$(document).ready(() => {
    updateUserWelcomeMessage();
    displayUserRanking();
});

// Generates a random index used for a random word and hint.
function newWordIndex() {
    let index = Math.floor(Math.random() * word_choice.length);
    return index;
}

// Resets the game state to 0.
function resetController() {
    num_of_guesses = GUESS_LIMIT;
    game_status = true;
    let word_index = newWordIndex();
    let word = word_choice[word_index];
    let hint = word_hints[word_index];
    current_word = new guessWord(word, hint); 
    updateDisplayWord();
    updateUserWelcomeMessage();
}

// Updates the display word that will be shown to the user.
function updateDisplayWord() {
    let temp_arr = [];
    for (let i = 0; i < current_word.word_arr.length; i++) {
        if (current_word.displayed_word_arr[i]) {
            temp_arr.push(current_word.displayed_word_arr[i]);
        } else {
            temp_arr.push("_");
        }
    }
    current_word.displayed_word = temp_arr.join(" ");
}

// Checks if the letter pressed by the user matched the word, and updates the score.
function letterPressedController(letter) {
    let did_update = false;
    let letters_found = 0;
    letter = letter.toLowerCase();
    for (let i = 0; i < current_word.word_arr.length; i++) {
        if (current_word.word_arr[i] == letter) {
            current_word.displayed_word_arr[i] = letter;
            did_update = true;
            letters_found++;
        }
    }
    if (did_update) {
        updateDisplayWord();
        user_score+=letters_found;
    } else {
        user_score--;
        num_of_guesses--;
    }
    updateUserScore();
    checkGameStatus();
}

// Checks the game status against win and lose conditions
function checkGameStatus() {
    let word_guessed = true;
    let out_of_guesses = false;

    for (let i = 0; i < current_word.word_arr.length; i++) {
        if (current_word.displayed_word_arr[i] == 0) {
            word_guessed = false;
        }
    }

    if (num_of_guesses === 0) {
        out_of_guesses = true;
    }

    if (word_guessed) {
        game_status = false;
        printWin();
        return;
    }

    if (out_of_guesses) {
        game_status = false;
        printLose();
        return;
    }
}

function updateUserWelcomeMessage() {
    let name = sessionStorage.getItem('name');
    if (name) {
        user_top_score = sessionStorage.getItem('topScore');
        displayWelcomeUserMessage(name, user_top_score);
        $('#indexLogInButton').hide();
        $('#indexSignUpButton').hide();
    } else {
        $('#indexSingOutButton').hide();
    }
}

function updateUserScore() {
    if (user_top_score !== null && user_score > parseInt(user_top_score)) {
        user_top_score = user_score;
        storeUserTopScore();
        updateUserWelcomeMessage();
    }
}

function displayUserRanking() {
    getUserRanks((ranks) => {
        let ranksArr = [];
        for (let rank in ranks) {
            ranksArr.push([rank, ranks[rank]]);
        }

        ranksArr.sort((a, b) => {
            return b[1].score - a[1].score;
        });

        for (let i = 0; i < ranksArr.length; i++) {
            appendRankTableRow(i+1, ranksArr[i][1].name, ranksArr[i][1].score);
        }
    })
}