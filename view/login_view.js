function logInView() {
    console.log("log in pressed");
    if (!validateLogIn()) {
        return;
    }
    let userName = $('#log-in-username').val();
    let pass = $('#log-in-password').val();
    logInController(userName, pass);
}

function displayLogInErrorMessage(msg) {
    $('#logInError').text(msg);
}