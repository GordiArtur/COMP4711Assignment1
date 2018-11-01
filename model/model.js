const GUESS_LIMIT = 7;
var current_word;
var game_status = true;
var user_score = 0;
var num_of_guesses = GUESS_LIMIT;
var word_choice = ["tattoo", "tree", "airplane", "hello", "electricity", "absurd", "blitz", "hangman", "razzmatazz", "azure"];
var word_hints = [
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
]

// Guess word object that stores all the information about the current word in play.
function guessWord(word, hint) {
    this.word = word;
    this.hint = hint;
    this.word_arr = this.word.split('');
    this.diplayed_word = undefined;
    this.displayed_word_arr = Array(this.word.length).fill(0);
    console.log("Word \"", this.word, "\" created.");
}