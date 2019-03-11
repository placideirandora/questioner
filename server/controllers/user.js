
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user';
import validate from '../middleware/validate';
import database from '../db/database';
import sql from '../helpers/sql';
import bcrypt from 'bcryptjs';

dotenv.config();

const users = {
  registerUser(req, res) {
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
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      const query = database(sql.registerUser, [user.firstname, user.lastname, user.othername, user.email, user.phoneNumber, user.username, user.password]);
      query.then((response) => {
        jwt.sign({ response: response[0] }, 'secretkey', (err, token) => {
          const {
            firstname, lastname, othername, email, phoneNumber, username,
          } = response[0];
          res.status(201).json({
            status: '201',
            success: 'user registered',
            data:[{
              token,
              user: {
                firstname, lastname, othername, email, phoneNumber, username,
              },
            }]
          });
        });
      }).catch((error) => {
        res.status(500).send({ status: '400', error: 'registrationn failed' });
      });
    }
  },

  loginUser(req, res) {
    const {
      email, password,
    } = req.body;

    const { error } = Joi.validate({
      email, password,
    }, validate.loginSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const query = database(sql.retrieveSpecificEmail, [email]);
      query.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ error: 'email not found' });
        }
        else{
        const truePass = bcrypt.compareSync(password, response[0].password);
        if(truePass){
          jwt.sign({ response: response[0] }, 'secretkey', { expiresIn: '2h' }, (err, token) => {
            const {
              firstname, lastname, othername, email, phoneNumber, username,
            } = response[0];
            res.status(200).json({
              status: '200',
              success: 'logged in',
              data: [{
                token,
                user: {
                  firstname, lastname, othername, email, phoneNumber, username,
                },
              }]
            });
          });
        } else{
          res.status(400).json({
            status: '400',
            error: "incorrect password"
          })
        }
      }
      }).catch((error) => {
        res.status(500).send({ error: 'internal server error', error });
      }); 
    }
  },
  
  retrieveUsers(req, res)
  {
    const allUsers = database(sql.retrieveAllusers);
    allUsers.then((response) => {
      if (response.length === 0) {
        res.status(404).json({
          status: '404',
          error: 'no user found',
        });
      } else {
        res.status(200).json({
          status: '200',
          success: 'users retrieved',
          users: response,
        });
      }
    }).catch((error) => {
      res.status(500).send({ error: 'error occured', error });
    });
  },
  deleteUser(req, res)
  {
    const userId = req.params.id;
    const { error } = Joi.validate({
      userId,
    }, validate.userParams);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const findUser = database(sql.retrieveSpecificUser, [userId]);
      findUser.then((response) => {
        if (response.length === 0 || response.length === 'undefined') {
          res.status(404).send({ status: '404', error: 'user with the specified id, not found' });
        } else {
          const deleteUser = database(sql.deleteSpecificUser, [userId]);
          deleteUser.then((response) => {
            if (response) {
              res.status(200).send({ success: 'user deleted' });
            } else {
              res.status(400).send({ error: 'user not deleted' });
            }
          }).catch((error) => {
            res.status(500).send({ error: 'error occured', error });
          });
        }
      }).catch((error) => {
        res.status(500).send({ error: 'error occured', error });
      });
    }
  },
  retrieveUser(req, res)
  {
    const userId = req.params.id;
    const { error } = Joi.validate({
      userId,
    }, validate.userParams);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const specificUser = database(sql.retrieveSpecificUser, [userId]);
      specificUser.then((response) => {
        if (response.length === 0 || response.length === 'undefined') {
          res.status(404).send({ status: '404', error: 'user with the specified id, not found' });
        } else {
          res.status(200).json({
            status: '200',
            success: 'user retrieved',
            meetup: response[0],
          });
        }
      }).catch((error) => {
        res.status(500).send({ error: 'error occured', error });
      });
    }
  }
};

export default users;
