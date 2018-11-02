function signUpController(credentials) {
    let encryptedData = credentials;
    // encrypt data

    if (!signUp(encryptedData)) {
        // display error user already exists
    }
}