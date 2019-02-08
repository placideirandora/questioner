import Joi from 'joi';
import  User  from '../models/user';
import dummy from '../models/dummy';
import validate from '../middleware/validate';

const users = {
    registerUser (req, res)
    {   
        const {
            firstname, lastname, othername, email, phoneNumber, username,
          } = req.body;
          const { error } = Joi.validate({
            firstname, lastname, othername, email, phoneNumber, username,
          }, validate.userSchema);
          if (error) {
            res.status(400).json({ error: error.details[0].message });
          } else {
            const id = dummy.users.length + 1;
            const user = new User(id, firstname, lastname, othername, email, phoneNumber, username);
            dummy.users.push(user);
              res.status(201).json({
                status: 201,
                success: 'user registered',
                data: {
                  user
                },
              });
          } 
},

    retrieveUsers (req, res)
    {
        res.status(200).json({
            status: 200,
            success: 'users retrieved',
            data: dummy.users
        });
    },

    retrieveUser (req, res)
    {   
        const userId = parseInt( req.params.id, 10);
        const { error } = Joi.validate({
            userId,
          }, validate.userParams);
          if (error) {
            res.status(400).json({ error: error.details[0].message });
          } else {
            dummy.users.map ((user) => {
            if (user.id === userId)
            {
                    res.status(200).json({
                    status: 200,
                    success: 'user retrieved',
                    data: user,
                });
            }
        });
           res.status(404).json({
           status: 404,
           error: 'user not found'
        });
    }
    },
};

export default users;