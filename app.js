//importing express

const express = require ('express');
const path=require('path');

//importing body-parser

const bodyParser = require ('body-parser');

//importing the router 

const router = require ('./routes/index.js');
//initializing the server


const app = express();
//setting views
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

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



