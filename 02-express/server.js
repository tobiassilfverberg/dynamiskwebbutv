/**
 * express
 */

const express = require('express');
const morgan = require('morgan');
const oneliners = require('./data/oneliners.json');

const app = express();

// Tell express to use ejs as it's view engine
app.set('view engine', 'ejs');

// log stuff with morgan
app.use( morgan('dev') );

// Respond to GET rquest for '/'
app.get('/', (req, res) => {
    // req = information om den inkommande förfrågan
    // res = metoder för att skicka ett svar på förfrågan
    // console.log(req.method, req.url);

    res.render('index');
});

// Respond with current time
app.get('/now', (req, res) => {
    res.send(`The current time is ${new Date()}`);
});

 // Respond with a random oneliner joke 
 app.get('/jokes', (req, res) => { 
    // 1. Somehow read the JSON-contents of data/oneliners.json 
    // 2. Get a random item from the array 
    const i = Math.floor(Math.random() * oneliners.length);
    const oneliner = oneliners[i];
    // 3. Respond with the item (`res.send(item)`) 
    res.render('jokes', { oneliner });
}); 

// Serve files from '/pages' if no other route matches
app.use( express.static('pages') );

// Let user know we're sorry
app.use((req, res, next) => {
    res.send("Sorry, we couldn't find that page");
});

// Start listening for incoming requests on port 3000 
app.listen(3000, () => {
    console.log("Yay, server started at http://localhost:3000");
});