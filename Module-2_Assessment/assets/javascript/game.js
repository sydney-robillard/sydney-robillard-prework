
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
let audio;


/*game function*/
const startFunction = function () {

    currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];   
    currentSong = songArray[Math.floor(Math.random() * songArray.length)];

    letters = currentWord.split('');

    spaces = [];
    guessesRemaining = 10;
    wrongLetters = [];
    lettersGuessed = [];

    for (let i = 0; i < letters.length; i++) {
    spaces.push('_');
    }

document.getElementById('currentWord').innerHTML = spaces.join(' ');
document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
document.getElementById('wins').innerHTML = wins;
document.getElementById('losses').innerHTML = losses;
document.getElementById('lettersGuessed').innerHTML = wrongLetters.join('');
}

function gameFunction (key) {

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

    lettersGuessed.push(key);

    document.getElementById('currentWord').innerHTML = spaces.join(' ');
    document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
    document.getElementById('lettersGuessed').innerHTML = wrongLetters.join('   ');
} //gameFunction

const endFunction = function () {

    document.getElementById('currentWord').innerHTML = spaces.join(' ');
    document.getElementById('guessesRemaining').innerHTML = guessesRemaining;
    document.getElementById('lettersGuessed').innerHTML = wrongLetters.join(' ');

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

function musicFunction () {
    let music = document.getElementById('music');
    music.src = currentSong;
    music.loop = true;
    music.load();
    music.play();
}
//Functions called//

function eventFunction (event) {
    
    let key = String.fromCharCode(event.keyCode).toLocaleLowerCase();
    
    gameFunction(key);
    endFunction();

    console.log(key);
}

document.addEventListener('keyup', eventFunction);