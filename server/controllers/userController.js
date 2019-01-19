//importing the users database 

const usersDB = require ('../models/userDB.js');

const uuid = require ('uuid');

class userControllers

{

    createUser (req, res)
    {   
        

        if (!req.body.firstname)
        {
            return res.status(400).send({
                "status": 400,
                "error": "firstname is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
                
            });
        }

        if (!req.body.lastname)
        {
            return res.status(400).send({
                "status": 400,
                "error": "lastname is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
                
            });
        }


        if (!req.body.username)
        {
            return res.status(400).send({
                "status": 400,
                "error": "username is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
                
            });
        }

        if (!req.body.email)
        {
            return res.status(400).send({
                "status": 400,
                "error": "email is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
            })
        }

        if (!req.body.phoneNumber)
        {
            return res.status(400).send({
                "status": 400,
                "error": "phoneNumber is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
            })
        }
        
        //an object of capturing the submitted data 

        const addUser = {
            id: uuid.v4(),
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


    getAllUsers (req, res)
    {
        if (usersDB == "")
        {
            return res.status(401).send({
                "status": 400,
                "error": "there are no users to retrieve. you should firstly add some users by using POST method.",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
   
            });
        }

        return res.status(200).send({
            "status": 200,
            "success": "users retrieved successfully",
            "data": usersDB
        });
    }


    getSpecificUser (req, res)
    {   

        const id = req.params.id;

        usersDB.map ((user, index) => {

            if (user.id === id)
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