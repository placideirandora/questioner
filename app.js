import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import users from './server/routes/user';
import meetups from './server/routes/meetup';
import questions from './server/routes/question';
import path from 'path';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'server/views'));
app.get('/', (req, res) => {
  res.render('index')
});

app.use(morgan('dev'));
app.use('/api/v1/auth', users);
app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({ error: {
      status: '400',
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => { console.log (`Server listening on port: ${PORT}`);});

export default app;
