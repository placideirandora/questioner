//importing the users database 

const usersDB = require ('../models/userDB.js');

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

        //array push method for adding a new user into the data structure, array

        usersDB.push (addUser);

        //when successfully added, return a message of the success with the status code, OK

        return res.status(200).send({
                "status": 200,
                "success": "user added successfully",
                "user": addUser

        })
    }

    //this function returns all users 

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
            "users": usersDB
        });
    }

    //this function returns a specific user 

    getSpecificUser (req, res)
    {   
        //extracting the submitted id

        const id = req.params.id;

        //looping through the entire db to find a matching id and return the user

        usersDB.map ((user, index) => {

            if (user.id === id)
            {
                return res.status(200).send({
                    "status": 200,
                    "success": "user retrieved successfully",
                    "user": user
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