$(document).ready(function () {

});

function signUpView() {
    console.log("sign up pressed");
    if (!validateSignUp()) {
        return;
    }
    let userName = $('#sign-up-username').val();
    let password = $('#sign-up-password').val();
    let credentials = {
        name: userName,
        pass: password
    };
    signUpController(credentials);
}

// // Validate password matching between two fields
// function confirmPasswordCheck(input) {
//     if (input.value != $('#sign-up-password').val()) {
//         console.log($('#sign-up-password').val());
//         input.setCustomValidity('Password Must be Matching.');
//     } else {
//         input.setCustomValidity('');
//     }
// }

function validateSignUp() {
    let inputs = [$('#sign-up-username'), $('#sign-up-password'), $('#sign-up-confirm-password')];
    let error = false;
    for (let i = 0; i < 3; i++) {
        inputs[i].removeClass('warning');
    }
    for (let i = 0; i < 3; i++) {
        if (inputs[i].val().length == 0) {
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
    if (inputs[1].val() != inputs[2].val()) {
        inputs[1].addClass('warning');
        inputs[2].addClass('warning');
        $('#signUpError').text(userString.passwordsMustMatchError);
        return false;
    }
    return true;
}