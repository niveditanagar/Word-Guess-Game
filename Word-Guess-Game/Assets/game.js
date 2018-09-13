//Global Variables:
var wordChoices = ["hermione", "dragon", "ron", "snape", "firebolt", "patronus", "sword", "james"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var currentWordIndex = 0;
var currentWord = wordChoices[currentWordIndex];
var wins = 0;
var guessNumRem = 8;
var puzzle = [];
var lettersUsed = [];


//how to get the _ _ _ _ to appear for each word:
window.onload = function buildPuzzle(){
    for(var i = 0; i < currentWord.length; i++){
        puzzle.push("_");
    }
    document.getElementById("puzzle").innerHTML = puzzle.join(" ");
    document.getElementById("numbersRem").innerHTML = guessNumRem;    
}

//Game code:
document.onkeyup = function(event) {
    var validated = validateGuess(event)
    
    if(validated === true){
        letterTracker(event.key);
        updateGameState(event.key);
        toWin(event.key);
    }   
}

//to sanatize to make sure that only the alaphabet letters are recognized 
function validateGuess(event){
    var alphabetIndex = alphabet.indexOf(event.key);
    var usedIndex = lettersUsed.indexOf(event.key);

    if(alphabetIndex === -1 || usedIndex > -1){
       return false; // this line wont' run unless the conditional evaluates to true
    }
    return true;
    
}

//Decrease the number of guesses left if the keypressed isn't in the current word
function updateGameState(keyPressed) {
    if (currentWord.includes(keyPressed) === false) {
        console.log("not here");
        guessNumRem--;
        console.log("Number of guesses remaining is " + guessNumRem); 
    }
    if(guessNumRem === 0) {
        changeWord();
    }//resets the word once the number of guesses 
    else {
        fillInPuzzle(keyPressed);
        document.getElementById("puzzle").innerHTML = puzzle;
    }
}

//keep track of the letters pressed: 
function letterTracker(keyPressed) {
    lettersUsed.push(keyPressed);
    document.getElementById("letters").innerHTML = lettersUsed;
    //console.log(lettersUsed);
    document.getElementById("numbersRem").innerHTML = guessNumRem;
    console.log(lettersUsed);
}

//to win a word:
function toWin(keyPressed) {
    if (!puzzle.includes("_")) {
        wins++;
        document.getElementById("yay").innerHTML = wins;
        changeWord();
    }  
}

//how to get letters to show up in the blank spaces/dashes:
function fillInPuzzle(keyPressed) {
    for(var i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i) === keyPressed) {
            puzzle[i] = keyPressed;
        }
    }
}

//To change the word:
function changeWord() { 
    currentWordIndex++; 
    currentWord = wordChoices[currentWordIndex];
    console.log(currentWord);
    puzzle.length = 0; //each time the word changes reset the dash lines
    lettersUsed.length = 0; //each time the word changes reset the lettersUsed array
    console.log(lettersUsed); 
    guessNumRem = 8; // once the word changes..reset the guess remaining back to 12
    console.log(puzzle);
    for(var i = 0; i < currentWord.length; i++){
        puzzle.push("_");
    }
    document.getElementById("puzzle").innerHTML = puzzle.join(" ");
    document.getElementById("letters").innerHTML = lettersUsed;
    document.getElementById("numbersRem").innerHTML = guessNumRem;
    
}