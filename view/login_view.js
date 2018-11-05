// Handles login button press and passes info to the login_controller for validation
function logInView() {
    if (!validateLogIn()) {
        return;
    }
    let userName = $('#log-in-username').val();
    let pass = $('#log-in-password').val();
    logInController(userName, pass);
}

// Displays error message on failed validation
function displayLogInErrorMessage(msg) {
    $('#logInError').text(msg);
}