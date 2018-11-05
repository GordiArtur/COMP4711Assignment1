// Creates a new guessing game.
$(document).ready(function () {
    resetView();
    printWord();
    printHint();
    $("#letters td").click(function() {
        if ($(this).css("opacity") != 0 && game_status) {
            $(this).css("opacity", 0);
            letterPressed($(this).text());
        }
    });
});

// Handles user's "reset" button press.
function resetView() {
    resetController();
    printWord();
    printScore();
    printHint();
    $("#letters td").css("opacity", 1);
    $('#hint').css("color", "#999999");
}

// Handles user's letter presses.
function letterPressed(letter) {
    letterPressedController(letter);
    printWord();
    printScore();
}

// Prints the current word to the user.
function printWord() {
    $("#word").text(current_word.displayed_word);
}

// Prints the current score to the user.
function printScore() {
    $("#score").text(user_score);
    $("#lives").text(num_of_guesses);
}

// Prints the current hint to the user.
function printHint() {
    $('#hint').text(current_word.hint);
}

// Prints the win message to the user.
function printWin() {
    $('#hint').text(userString.winMessage).css("color", "#000000");
}

// Prints the lose message to the user.
function printLose() {
    $('#hint').text(userString.loseMessage).css("color", "#FF0000");
}

// Displays welcome message to the user
function displayWelcomeUserMessage(name, score) {
    $('#welcome-user-msg').text(userString.welcomeMessage(name, score));
}

// Handles sign out button
function indexSignOutButton() {
    signOutUser();
}

// Appends a row to the rank table
function appendRankTableRow(rank, name, score) {
    // language=HTML
    $('#score-ranks tbody').append(
        `<tr>
            <th>${rank}</th>
            <td>${name}</td>
            <td>${score}</td>
        </tr>`
    );
}