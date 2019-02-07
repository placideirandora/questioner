//importing the users database 

const usersDB = require ('../models/userDB.js');

const validate = require ('../middleware/validate');

const Joi = require ('joi');

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
            id: usersDB.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            othername: req.body.othername,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            username: req.body.username,
            registered: new Date().toGMTString(),
            isAdmin: false,
        };

        usersDB.push (addUser);

        return res.status(201).send({
                "status": 201,
                "success": "user added successfully",
                "data": addUser
        })
    }
}


    getAllUsers (req, res)
    {

        return res.status(200).send({
            "status": 200,
            "success": "users retrieved successfully",
            "data": usersDB
        });
    }


    getSpecificUser (req, res)
    {   

        const gsuid = parseInt(req.params.id, 10);

        usersDB.map ((user, index) => {

            if (user.id === gsuid)
            {
                return res.status(200).send({
                    "status": 200,
                    "success": "user retrieved successfully",
                    "data": user
                });
            }
        });


        return res.status(404).send({
            "status": 404,
            "error": "user not found"
        });
    }
}


const userController = new userControllers();

module.exports = userController;