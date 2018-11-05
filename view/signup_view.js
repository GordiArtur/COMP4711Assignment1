// Handles sign up button press and passes info to signup_controller for validation
function signUpView() {
    if (!validateSignUp()) {
        return;
    }
    let userName = $('#sign-up-username').val();
    let pass = $('#sign-up-password').val();
    signUpController(userName, pass);
}

// Displays error message on failed validation
function displaySignUpErrorMessage(msg) {
    $('#signUpError').text(msg);
}