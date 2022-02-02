/**
 * express
 */

const express = require('express');
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
    console.log(req.method, req.url);

    res.send("Cupcake ipsum dolor sit amet. Liquorice gingerbread powder gummies pudding cupcake fruitcake marshmallow chupa chups. Biscuit cake bonbon jelly beans apple pie chocolate bar soufflé.");
});

// Start listening for incoming requests on port 3000 
app.listen(3000, () => {
    console.log("Yay, server started at http://localhost:3000");
});