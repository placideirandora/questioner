
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from '../model/user';
import validate from '../middleware/validate';
import database from '../db/database';
import sql from '../helpers/sql';

const users = {
  register(req, res) {
    const {
      firstname, lastname, othername, email, phoneNumber, username, password,
    } = req.body;

    const { error } = Joi.validate({
      firstname, lastname, othername, email, phoneNumber, username, password,
    }, validate.userSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const user = new User(firstname, lastname, othername, email, phoneNumber, username, password);
      const query = database(sql.registerUser, [user.firstname, user.lastname, user.othername, user.email, user.phoneNumber, user.username, user.password]);
      query.then((response) => {
        jwt.sign({ response: response[0] }, 'secretkey', (err, token) => {
          const {
            firstname, lastname, othername, email, phoneNumber, username,
          } = response[0];
          res.status(201).json({
            status: '201',
            token,
            success: 'user registered',
            user: {
              firstname, lastname, othername, email, phoneNumber, username,
            },
          });
        });
      }).catch((error) => {
        res.status(500).send({ status: '400', error: 'registrationn failed' });
      });
    }
  },

  login(req, res) {
    const {
      email, password,
    } = req.body;

    const { error } = Joi.validate({
      email, password,
    }, validate.loginSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const query = database(sql.login, [email, password]);
      query.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ error: 'Incorrect username or password' });
        }
        jwt.sign({ response: response[0] }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
          const {
            firstname, lastname, othername, email, phoneNumber, username,
          } = response[0];
          res.status(200).json({
            status: '200',
            message: 'welcome',
            token,
            user: {
              firstname, lastname, othername, email, phoneNumber, username,
            },
          });
        });
      }).catch((error) => {
        res.status(500).send({ message: 'an error has occured', error });
      });
    }
  },
};

export default users;
