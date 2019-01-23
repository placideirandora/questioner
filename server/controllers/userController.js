import databaseConnection from '../config/database';

import userSchema from '../helpers/userSchema.js';

import Joi from 'joi';

class userControllers

{

    createUser (req, res)
    {   
        const { error } = Joi.validate (req.body, userSchema);

        if (error)
        {
            return res.status(400).send({
                "status": 400,
                "error": error.details[0].message
            })
        }

        else 

        {

        const addUser = {

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            othername: req.body.othername,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            username: req.body.username,
            isAdmin: req.body.isAdmin
        };

        databaseConnection.query('INSERT INTO users(firstname, lastname, othername, email, phoneNumber, username, isAdmin) '+
        'values($1, $2, $3, $4, $5, $6, $7)',

        [addUser.firstname, addUser.lastname, addUser.othername, addUser.email, addUser.phoneNumber, addUser.username, 
            addUser.isAdmin])

         .then ( users => {

            return res.status(201).send({

                "status": 201,
                "success": "user created successfully",
        

        });

         })
         
         .catch( error => {

             console.log(error);
         })

    }
}


    getAllUsers (req, res)
    {

        databaseConnection.query ('SELECT * FROM users')

        .then( users => {

            return res.status(200).send({

                "status": 200,
                "success": "users retrieved successfully",
                "data": users.rows

            });
        })

        .catch( error => {

            console.log(error);

        })

       
    }


    getSpecificUser (req, res)
    {   

        const gsuid = parseInt(req.params.id, 10);

        databaseConnection.query ('SELECT * FROM users WHERE id = ' + gsuid)

        .then( users => {

            return res.status(200).send({

                "status": 200,
                "success": "user retrieved successfully",
                "data": users.rows

            });
        })

        .catch( error => {

            console.log(error);

        })
       
    }
}


const userController = new userControllers();

export default userController;