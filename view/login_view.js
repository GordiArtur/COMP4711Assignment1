function logInView() {
    console.log("log in pressed");
    if (!validateLogIn()) {
        return;
    }
    let userName = $('#log-in-username').val();
    let pass = $('#log-in-password').val();
    let credentials = {
        name: userName,
        password: pass
    };
    logInController(credentials);
}

function displayLogInErrorMessage(msg) {
    $('#logInError').text(msg);
}