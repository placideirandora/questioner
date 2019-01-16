//importing express

const express = require ('express');

//importing body-parser

const bodyParser = require ('body-parser');

//importing the router 

const router = require ('./routes/index.js');

//initializing the server

const app = express();

//implementing the body-parser

app.use (bodyParser.json());

app.use (bodyParser.urlencoded({extended: false}));

//implementing the router

app.use(router);

//setting up server's port

const PORT = 3000;

//setting up the server for listening to the specified port and return a message of functionality

app.listen (PORT, () => {
    console.log (`Server listening on the port: ${PORT}`);
});



