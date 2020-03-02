// import { json } from "body-parser";

let displayArray = []
let GameId = 0
let counter = 0
let content = document.querySelector('.content');
let body = document.querySelector('body');
let storedLetter = document.getElementById('letter');
let display = document.createElement('h2')
const startGame = () => {
    fetch(`/hangman/words`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(res => {
        const {id, length} = res;
        for (i=0; i<length; i += 1) {
            displayArray.push('_ ')
        }
        console.log(res)
        GameId = id
        console.log(GameId, 'start game id')
;
        let displayArrayToString = displayArray.toString()
        display.innerHTML = displayArrayToString
        document.body.appendChild(display)
    })
}
startGame();
console.log(GameId, 'global game id')
console.log('this working?')

const guessLetter = (event) => {
    event.preventDefault();
    console.log(GameId,'guess id')
    console.log(storedLetter.value, 'stored letter')
    fetch (`guess/${GameId}/${storedLetter.value}`, {
    method: 'get',
    headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
    }
    })
    .then(res => res.json())
    .then(res => {
    const {responseArray, letter} = res
    if (responseArray.find(bool => bool !== false)) {
        console.log('correct')
    } else {
        counter += 1
        console.log(counter)
    }
    if (counter === 6) {
        console.log('you lose')
    }

    responseArray.forEach((space, index) => {
        if (space === true) {
            displayArray[index] = letter;
            console.log(displayArray);
            display.innerHTML = displayArray
        }
    });
    if (displayArray.every(space => space !== '_ ')) {
        console.log('you win')
    }
})
}