/**
 * express
 */

const express = require('express');
const path = require('path');
const app = express();

// Respond to GET rquest for '/'
app.get('/', (req, res) => {
    // req = information om den inkommande förfrågan
    // res = metoder för att skicka ett svar på förfrågan
    console.log(req.method, req.url);

    res.send("Hello from root");
});

// Respond to GET request for '/nom'
app.get('/nom', (req, res) => {
    res.sendFile( path.join(__dirname + '/pages/nom.html'));
});

// respond to GET request for '/index'
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

// Respond to GET request for '/about'
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/pages/about.html');
});

// respond to GET request for '/contact'
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/pages/contact.html');
});

// Respond to GET request for `/api/nom`
app.get('/api/nom', (req, res) => {
    res.send({ msg: "Cakes are nom-nom-nom" });
});

// Start listening for incoming requests on port 3000 
app.listen(3000, () => {
    console.log("Yay, server started at http://localhost:3000");
});