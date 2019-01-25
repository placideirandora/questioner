import databaseConnection from '../config/database';

import userSchema from '../helpers/userSchema.js';

import loginSchema from '../helpers/loginSchema.js';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

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
            password: bcrypt.hashSync(req.body.password, 10)
        };

        //const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        databaseConnection.query('INSERT INTO users(firstname, lastname, othername, email, phoneNumber, username, password) '+
        'values($1, $2, $3, $4, $5, $6, $7) returning *',

        [addUser.firstname, addUser.lastname, addUser.othername,
             addUser.email, addUser.phoneNumber, addUser.username, 
            addUser.password])

         .then ( users => {

            jwt.sign({users: users.rows[0] }, 'secret-key', (error, token) => {

                return res.status(201).send({

                    "status": 201,
                    "success": "user registered successfully",
                    token: token,
                    "user": users.rows
            
    
            });

            } )

           

         })
         
         .catch( error => {

             console.log(error);
         })

    }
}

    loginUser(req, res)
    {

        const { error } = Joi.validate (req.body, loginSchema);

        if (error)
        {
            return res.status(400).send({
                "status": 400,
                "error": error.details[0].message
            })
        }

        else 

        {

        const email = req.body.email;
        const pass = req.body.password;

       databaseConnection.query ('SELECT * FROM users WHERE email = $1' , 
       [email])
        
        .then( users => {

            if (users.rows === undefined || users.rows.length == 0)
            {
                return res.status(404).send({
                    error: "email does not exist"
                })
            }

            else
            {
                const passi = bcrypt.compareSync(pass, users.rows[0].password)

                if (passi)
                {
                    const payload={

                        username:users.rows[0].username,
                        email:users.rows[0].email,
                        id:users.rows[0].id
        
                    };
        
                    jwt.sign(payload,'secret-key',{expiresIn:'2d'},(er,token)=>{
                        if(er){
                            console.log(er);
                        };
                     
                    return res.status(200).send({
                        status: 200,
                        success: "user logged in successfully",
                        token:token,
                        user: users.rows,
        
        
                    });
                    })
                }

                else
                {
                    return res.status(401).send({
                        error: "incorrect password"
                    })
                }

                
            }

           
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

            if (!users.rows.length) {

                return res.status(404).send({
                    status: 404,
                    error: 'user not found',
                });

            }

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