import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import user from './server/routes/user';
import meetup from './server/routes/meetup';
import question from './server/routes/question';
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
app.use('/api/v1/auth', user);
app.use('/api/v1/users', user);
app.use('/api/v1/meetups', meetup);
app.use('/api/v1/questions', question);

app.use((req, res, next) => {
  const error = new Error('route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({ 
      status: '400',
      error: error.message,
  });
});

const PORT = process.env.PORT || 5500;
app.listen (PORT, () => { 
  console.log (`Server listening on port: ${PORT}`); 
});

export default app;
