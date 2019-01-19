//importing required modules for functionality

const express = require ('express');

const userRouter = require ('./server/routes/userRoutes');

const meetUpRouter = require ('./server/routes/meetUpRoutes');

const questionRouter = require ('./server/routes/questionRoutes');

const path = require('path');

const bodyParser = require ('body-parser');

//setting up the server

const app = express();

//implementing view engine and the path

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

//implementing the body-parser

app.use (bodyParser.json());

app.use (bodyParser.urlencoded({extended: false}));

//implementing the routers

app.use(userRouter);

app.use(meetUpRouter);

app.use(questionRouter);

//setting up the server's port

const PORT = process.env.PORT || 3000;

//setting up the server for listening to the specified port and return a message of functionality

app.listen (PORT, () => {
    console.log (`Server listening on the port: ${PORT}`);
});


module.exports = app
