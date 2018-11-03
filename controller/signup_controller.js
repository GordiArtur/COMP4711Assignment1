function signUpController(credentials) {
    let encryptedData = credentials;
    // encrypt data

    signUp(encryptedData, (msg) => {
        if (msg) {
            displaySignUpErrorMessage(msg);
        } else {
            displaySignUpErrorMessage("created!");
        }
    });
}

function validateSignUp() {
    let inputs = [$('#sign-up-username'), $('#sign-up-password'), $('#sign-up-confirm-password')];
    let error = false;
    for (let i = 0; i < 3; i++) {
        inputs[i].removeClass('warning');
    }
    for (let i = 0; i < 3; i++) {
        if (inputs[i].val().length === 0) {
            error = true;
            inputs[i].addClass('warning');
            $('#signUpError').text(userString.emptyFieldError);
        }
    }
    if (error) { return false; }
    if (inputs[1].val().length < 6) {
        inputs[1].addClass('warning');
        $('#signUpError').text(userString.passwordLengthError);
        return false;
    }
    if (inputs[1].val() !== inputs[2].val()) {
        inputs[1].addClass('warning');
        inputs[2].addClass('warning');
        $('#signUpError').text(userString.passwordsMustMatchError);
        return false;
    }
    return true;
}