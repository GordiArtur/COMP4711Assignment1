$(document).ready(() => {
    let name = sessionStorage.getItem('name');
    if (name) {
        displayLogInErrorMessage(userString.alreadyLoggedInWarning);
    }
});

function logInController(credentials) {
    let encryptedData = credentials;
    // encrypt data

    logIn(encryptedData, (msg) => {
        if (msg) {
            displayLogInErrorMessage(msg);
        } else {
            displayLogInErrorMessage("logged in!");
            window.location.href = "/";
        }
    });
}

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