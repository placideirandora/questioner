import express from 'express';

import userRouter from './server/routes/userRoutes';

import meetUpRouter from './server/routes/meetUpRoutes';

import questionRouter from './server/routes/questionRoutes';

import path from 'path';

import bodyParser from 'body-parser';

const app = express();

//setting the view engine to ejs and the path

app.set('view engine','ejs');

app.set('views', path.join(__dirname,'server/views'));

//back-end web-app ejs template for homepage

app.get('/', (req, res) => {
    res.render('index')
  });

//implementing the body-parser and routers

app.use (bodyParser.json());

app.use (bodyParser.urlencoded({extended: false}));

app.use(userRouter);

app.use(meetUpRouter);

app.use(questionRouter);

// Error handling
app.use((req, res, next) => {
    
    res.status(404).send({
        "error": "Endpoint Not Found!"
    })

  });

//setting up the server's port

const PORT = process.env.PORT || 3000;

app.listen (PORT, () => {
    console.log (`Server listening on the port: ${PORT}`);
});

export default app;