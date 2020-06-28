
/*Figure out how to not repeat words*/
const wordBank = [
    'animagus',
    'basilisk',
    'bellatrix',
    'bludger',
    'broomstick',
    'dementor',
    'dobby',
    'dumbledore',
    'gringotts',
    'gryffindor',
    'hagrid',
    'hedwig',
    'hermione',
    'hippogriff',
    'hogwarts',
    'hufflepuff',
    'lovegood',
    'lupin',
    'malfoy',
    'mcgonagall',
    'moody',
    'muggle',
    'patronus',
    'parselmouth',
    'pettigrew',
    'polyjuice',
    'potter',
    'quaffle',
    'quidditch',
    'ravenclaw',
    'slytherin',
    'snape',
    'snitch',
    'umbridge',
    'veritaserum',
    'voldemort',
    'weasley',
    'werewolf',
    'wizengamot'
];

const songArray = [
    'assets/music/music1.mp3',
    'assets/music/music2.mp3',
    'assets/music/music3.mp3',
    'assets/music/music4.mp3',
    'assets/music/music5.mp3',
    'assets/music/music6.mp3',
    'assets/music/music7.mp3',
    'assets/music/music8.mp3',
    'assets/music/music9.mp3'
];

/*setting initial variables*/
let currentWord = '';
let currentSong = '';
let letters = [];
let spaces = [];
let guessesRemaining = 0;
let lettersGuessed = [];
let wrongLetters = [];
let wins = 0;
let losses = 0;

/*game function*/
const startFunction = function () {

    //randomly select word and song
    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];   
    currentSong = songArray[Math.floor(Math.random() * songArray.length)];
    //create an array of the letters for the current word
    letters = currentWord.split('');
    //fill the initial variables for start of game
    spaces = [];
    guessesRemaining = 10;
    wrongLetters = [];
    lettersGuessed = [];
    //fill the spaces array with underscores for the start of the game
    for (let i = 0; i < letters.length; i++) {
    spaces.push('_');
    }
//push all of the following variables to HTML
//'getElementById seems to be more straight forward than querySelector
//because it only requires one line and reduces number of variables
document.getElementById('currentWord').innerHTML = spaces.join(' ');
document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
document.getElementById('wins').innerHTML = wins;
document.getElementById('losses').innerHTML = losses;
document.getElementById('lettersGuessed').innerHTML = wrongLetters.join('');
}

function gameFunction (key) {
    //makes sure the function is not called more than once for the same key press
    once: true;

    //Preventing same letter to be input twice
    for (let i=0; i < lettersGuessed.length; i++) {
        if (key === lettersGuessed[i]) {
            return false;
        }
    }
    
    //does the letter exist in the word?
    let match = false;

    for (let i=0; i < letters.length; i++) {
        if (key === currentWord[i]) {
            match = true;
        } 
    }

    //what happens if there is a match?
    if (match) {
        for (let i=0; i < letters.length; i++) {
            if (key === currentWord[i]) {
                spaces[i] = key;
            } 
        }
    } else {
        wrongLetters.push(key);
        guessesRemaining--;
    }
    
    //this array must be filled *after* the previous operations
    lettersGuessed.push(key);

    //fills the following variables as 
    document.getElementById('currentWord').innerHTML = spaces.join(' ');
    document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
    document.getElementById('lettersGuessed').innerHTML = wrongLetters.join('   ');
} //gameFunction

const endFunction = function () {

    document.getElementById('currentWord').innerHTML = spaces.join(' ');
    document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
    document.getElementById('lettersGuessed').innerHTML = wrongLetters.join(' ');

    //Determine what happens if the game is won or lost
    if (guessesRemaining === 0) {
        losses++;
        document.getElementById('losses').innerHTML = losses;
        document.getElementById('lastWord').innerHTML = currentWord;
        startFunction();
        musicFunction();
    } else if (JSON.stringify(spaces) === JSON.stringify(letters)) {
        wins++;
        document.getElementById('wins').innerHTML = wins;
        document.getElementById('lastWord').innerHTML = currentWord;
        startFunction();
        musicFunction();
    }

}

//Music Function
let isPlaying = false;

function musicFunction () {
    isPlaying = true;
    let music = document.getElementById('music');
    music.src = currentSong;
    music.loop = true;
    music.load();
    music.play();
}

function musicToggle () {
    music = document.getElementById('music');

    if (isPlaying) {
        music.pause();
        isPlaying = false;
    } else {
        musicFunction();
    }
}    

//Functions called//

function eventFunction (event) {
    
    let key = String.fromCharCode(event.keyCode).toLocaleLowerCase();
    
    gameFunction(key);
    endFunction();

    console.log(key);
}

document.addEventListener('keyup', eventFunction);