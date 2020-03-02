'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {words} = require('./data/words')
let success = false

const wordGenerator = (req, res) => {
    let randomWord = words[Math.floor(Math.random()*10)]
    res.send ({
        id: randomWord.id,
        length: randomWord.length
    })
}

const guessHandler = (req, res) => {
    let reqId = req.params.wordId
    console.log(reqId, 'id')
    let letter = req.params.letter
    console.log(letter, 'letter')
    let cachedWord = words.find(word => word.id == reqId)
    console.log(cachedWord , 'word')
    let splitWord = cachedWord.word.split('')
    console.log(splitWord, 'array')
    let responseArray = splitWord.map(storedLetter => storedLetter == letter)
    console.log(responseArray, 'response array')

    res.send ({
        responseArray : responseArray,
        letter : letter
    })
}
const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    .get('/hangman/words', wordGenerator)
    .get('/hangman/guess/:wordId/:letter', guessHandler)
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))

    // endpoints

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));