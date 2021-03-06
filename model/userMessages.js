let word_choice = ["tattoo", "tree", "airplane", "hello", "electricity", "absurd", "blitz", "hangman", "razzmatazz", "azure"];
let word_hints = [
    "A form of body modification where a design is made by inserting ink.",
    "A woody perennial plant, typically having a single stem or trunk growing to a considerable height and bearing lateral branches at some distance from the ground.",
    "A powered flying vehicle with fixed wings and a weight greater than that of the air it displaces.",
    "Used as a greeting or to begin a telephone conversation.",
    "Is the set of physical phenomena associated with the presence and motion of electric charge.",
    "Wildly unreasonable, illogical, or inappropriate.",
    "An intensive or sudden military attack.",
    "An executioner who hangs condemned people.",
    "Another term for razzle-dazzle.",
    "Bright blue in color, like a cloudless sky."
];
let userString = {
    emptyFieldError: "Please fill out every field",
    passwordsMustMatchError: "Passwords must match",
    passwordLengthError: "Password must be at least 6 characters long",
    userNameExistsError: "This username already exists. Pick another one",
    databaseConnectionError: "Database insert error. Please try again",
    wrongUserInputError: "Wrong username and/or password",
    alreadyLoggedInWarning: "You are already logged in",
    loggedIn: "Logged In!",
    signedUp: "Created!",
    winMessage: "YOU WON!!",
    loseMessage: "YOU LOST!",
    welcomeMessage: (user, score) => {return `Welcome ${user}! Your high score is: ${score}`;}
};