$(document).ready(() => {
    let name = sessionStorage.getItem('name');
    if (name) {
        displayLogInErrorMessage(userString.alreadyLoggedInWarning);
    }
});

// Handles login functionality
function logInController(userName, pass) {
    userName = userName.toLowerCase();
    logIn(userName, pass, (msg) => {
        if (msg) {
            displayLogInErrorMessage(msg);
        } else {
            displayLogInErrorMessage(userString.loggedIn);
            window.location.href = "/";
        }
    });
}

// Validates logging users in
function validateLogIn() {
    let inputs = [$('#log-in-username'), $('#log-in-password')];
    let error = false;
    for (let i = 0; i < 2; i++) {
        inputs[i].removeClass('warning');
    }
    for (let i = 0; i < 2; i++) {
        if (inputs[i].val().length === 0) {
            error = true;
            inputs[i].addClass('warning');
            $('#logInError').text(userString.emptyFieldError);
        }
    }
    return !error;
}