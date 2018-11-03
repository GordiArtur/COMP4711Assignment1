function signUpView() {
    console.log("sign up pressed");
    if (!validateSignUp()) {
        return;
    }
    let userName = $('#sign-up-username').val();
    let pass = $('#sign-up-password').val();
    let credentials = {
        name: userName,
        password: pass
    };
    signUpController(credentials);
}

function displaySignUpErrorMessage(msg) {
    $('#signUpError').text(msg);
}