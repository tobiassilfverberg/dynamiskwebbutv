/**
 * express
 */

const express = require('express');
const fs = require("fs").promises;
const path = require('path');
const app = express();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// // Respond to GET rquest for '/'
app.get('/', (req, res) => {
    // req = information om den inkommande förfrågan
    // res = metoder för att skicka ett svar på förfrågan
    // console.log(req.method, req.url);

    res.send("Hello from root");
});

// Respond with current time
app.get('/now', (req, res) => {
    res.send(`The current time is ${new Date()}`);
});

 // Respond with a random oneliner joke 
 app.get('/jokes', (req, res) => { 
    // 1. Somehow read the JSON-contents of data/oneliners.json 
    // 2. Get a random item from the array 
    // 3. Respond with the item (`res.send(item)`) 
    fs.readFile("./data/oneliners.json", "utf-8")
    .then((data) => {
        const jokes = JSON.parse(data);
        console.log(jokes);
        let numberOfJoke = getRandomInt(0, 7);
        let randomJoke = jokes[numberOfJoke];
        res.send(randomJoke);
    })
    .catch((e) => {
        console.error(e);
    });
}); 

// Serve files from '/pages' if no other route matches
app.use( express.static('pages') );

// Start listening for incoming requests on port 3000 
app.listen(3000, () => {
    console.log("Yay, server started at http://localhost:3000");
});