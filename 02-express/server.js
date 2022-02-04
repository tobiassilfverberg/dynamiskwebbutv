/**
 * express
 */

const express = require('express');
const morgan = require('morgan');
const oneliners = require('./data/oneliners.json');
const users = require('./data/users.json');

const app = express();

// Tell express to use ejs as it's view engine
app.set('view engine', 'ejs');

// log stuff with morgan
app.use( morgan('dev') );

// Respond to GET rquest for '/'
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Index', 
        users
    });
});

// Respond to get request for /users/:userId
app.get('/users/:userId', (req, res) => {
    // Somehow use req.params.userId to get the corresponding user from the users array,
    // and send that user to a view (which displays that users information)
    res.render('user', { 
        users, 
        user: req.params.userId, 
        title: 'More info about user'
    });
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
    res.render('jokes', { title: 'Jokes', oneliner});
}); 

// Serve files from '/pages' if no other route matches
app.use( express.static('public') );

// Let user know we're sorry
app.use((req, res, next) => {
    res.send("Sorry, we couldn't find that page");
});

// Start listening for incoming requests on port 3000 
app.listen(3000, () => {
    console.log("Yay, server started at http://localhost:3000");
});