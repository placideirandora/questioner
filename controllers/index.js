
//importing the users database 

const usersDB = require ('../models/userDB.js');

//importing the meetups database 

const meetUpsDB = require ('../models/meetUpDB.js');

//inmporting the questions database

const questionsDB = require ('../models/questionDB.js');

//importing RSVP database

const rsvpDB = require ('../models/rsvpDB.js');

//creating a class of controllers for handling the requests and responses

class Controllers 

{

    //this function creates a new user

    createUser (req, res)
    {   
        //when id is not provided, a new user will not be created

        if (!req.body.id)
        {
            return res.status(400).send({
                "success": "false",
                "message": "user id is required",
            });
        }

        if (!req.body.firstname)
        {
            return res.status(400).send({
                "success": "false",
                "message": "firstname is required",
            });
        }

        if (!req.body.lastname)
        {
            return res.status(400).send({
                "success": "false",
                "message": "lastname is required",
            });
        }

        //when username is not provided, a new user will not be created

        if (!req.body.username)
        {
            return res.status(400).send({
                "success": "false",
                "message": "username is required",
            });
        }

        if (!req.body.email)
        {
            return res.status(400).send({
                "success": "false",
                "message": "email is required",
            })
        }

        if (!req.body.phonenumber)
        {
            return res.status(400).send({
                "success": "false",
                "message": "phone number is required",
            })
        }
        
        //an object of capturing the submitted data 

        const addUser = {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            othername: req.body.othername,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            username: req.body.username,
            registeredDate: req.body.registeredDate,
            isAdmin: req.body.isAdmin,
        };

        //array push method for adding a new user into the data structure, array

        usersDB.push (addUser);

        //when successfully added, return a message of the success with the status code, OK

        return res.status(200).send({

                "success": "true",
                "message": "user added successfully"

        })
    }

    //this function returns all users 

    getAllUsers (req, res)
    {
        return res.status(200).send({
            "success": "true",
            "message": "users retrieved successfully",
            usersDB,
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
                    "success": "true",
                    "message": "user retrieved successfully",
                    user
                });
            }
        });

        //when there is no matching id, return user not found with 404 status code

        return res.status(404).send({
            "success": "false",
            "message": "user not found"
        });
    }

    //this function creates a new meetup

    createMeetUp (req, res)
    {   
        //when id is not provided, a new meetup will not be created

        if (!req.body.id)
        {
            return res.status(400).send({
                "success": "false",
                "message": "meetup id is required",
            });
        }

        if (!req.body.location)
        {
            return res.status(400).send({
                "success": "false",
                "message": "location is required",
            });
        }

        if (!req.body.topic)
        {
            return res.status(400).send({
                "success": "false",
                "message": "topic is required",
            });
        }

        if (!req.body.happeningOn)
        {
            return res.status(400).send({
                "success": "false",
                "message": "date of meetup happening is required",
            });
        }
        
        //an object of capturing the submitted data 

        const addMeetUp = {
            id: req.body.id,
            topic: req.body.topic,
            location: req.body.location,
            happeningOn: req.body.happeningOn,
            tags: req.body.tags,
        };

        //array push method for adding a new meetup into the data structure, array

        meetUpsDB.push (addMeetUp);

        //when successfully added, return a message of the success with the status code, OK

        return res.status(200).send({

                "success": "true",
                "message": "meetup added successfully"

        });
    }

    //this function returns all meetups 

    getAllMeetUps (req, res)
    {
        return res.status(200).send({
            "success": "true",
            "message": "meetups retrieved successfully",
            meetUpsDB,
        });
    }

    //this function returns a specific meetup according to the id

    getSpecificMeetUp(req, res)
    {
        const id = req.params.id;

        meetUpsDB.map ((meetup, index) => {
            if (meetup.id === id)
            {
                return res.status(200).send({
                    "success": "true",
                    "message": "meetup retrieved successfully",
                    meetup,
                });
            }
        });

       return res.status(404).send({
            "success": "false",
            "message": "meetup not found"
        });
    }

    //this function creates a new question

    createQuestion (req, res)
    {   
        //when id is not provided, a new question will not be created

        if (!req.body.id)
        {
            return res.status(400).send({
                "success": "false",
                "message": "question id is required",
            });
        }

        if (!req.body.user)
        {
            return res.status(400).send({
                "success": "false",
                "message": "the user who asked the question is required",
            });
        }

        if (!req.body.meetup)
        {
            return res.status(400).send({
                "success": "false",
                "message": "the meetup for the question is required",
            });
        }

        if (!req.body.title)
        {
            return res.status(400).send({
                "success": "false",
                "message": "title of the question is required",
            });
        }

        if (!req.body.body)
        {
            return res.status(400).send({
                "success": "false",
                "message": "the content of the question is required",
            })
        }
        
        //an object of capturing the submitted data 

        const addQuestion = {
            id: req.body.id,
            user: req.body.user,
            meetup: req.body.meetup,
            title: req.body.title,
            body: req.body.body,
            votes: 0
        };

        //array push method for adding a new question into the data structure, array

        questionsDB.push (addQuestion);

        //when successfully posted, return a message of the success with the status code, OK

        return res.status(200).send({

                "success": "true",
                "message": "question posted successfully"

        })
    }

     //this function returns all questions

     getAllQuestions (req, res)
     {
         return res.status(200).send({
             "success": "true",
             "message": "questions retrieved successfully",
             questionsDB,
         });
     }
 
     //this function returns a specific question according to the id
 
     getSpecificQuestion(req, res)
     {
         const id = req.params.id;
 
         questionsDB.map ((question, index) => {
             if (question.id === id)
             {
                 return res.status(200).send({
                     "success": "true",
                     "message": "question retrieved successfully",
                     question,
                 });
             }
         });
 
        return res.status(404).send({
             "success": "false",
             "message": "question not found"
         });
     }

     //this function upvotes a specific question

     upvoteQuestion (req, res)
     {
        const id = req.params.id;

        let questionFound;
        let itemIndex;
    
        questionsDB.map ((findQuestion, index) => {
            if (findQuestion.id === id) 
            {
                questionFound = findQuestion;
                itemIndex = index;
    
            }
        });
    
        if (!questionFound)
        {
            return res.status(404).send({
                success: 'false',
                message: 'question not found',
            });
        }
    
        const updateTheQuestion = {
            id: req.body.id,
            user: req.body.user,
            meetup: req.body.meetup,
            title: req.body.title,
            body: req.body.body,
            votes:  question.length + 1
        };
    
        questionsDB.splice (itemIndex, 1, updateTheQuestion);
    
        return res.status (201).send ({
            success: 'true',
            message: 'question upvoted successfully',
            updateTheQuestion,
        });

     }

     //this function downvotes a specific question

     downvoteQuestion (req, res)
     {
        const id = req.params.id;
 
        questionsDB.map ((question, index) => {
            if (question.id === id)
            {
                return res.status(200).send({
                    "success": "true",
                    "message": "question downvoted successfully",
                    question,
                });
            }
        });

       return res.status(404).send({
            "success": "false",
            "message": "question downvote failed"
        });
     }

     //this function creates a new RSVP for a specific meetup

createRSVP (req, res)
{
 //when id is not provided, a new user will not be created

 if (!req.body.id)
 {
     return res.status(400).send({
         "success": "false",
         "message": "rsvp id is required",
     });
 }

 if (!req.body.userid)
 {
     return res.status(400).send({
         "success": "false",
         "message": "user id is required",
     });
 }

 if (!req.body.meetupid)
 {
     return res.status(400).send({
         "success": "false",
         "message": "meetup id is required",
     });
 }

 if (!req.body.response)
 {
     return res.status(400).send({
         "success": "false",
         "message": "response is required",
     });
 }
 
 //an object of capturing the submitted data 

 const addRSVP = {
     id: req.body.id,
     userid: req.body.userid,
     meetupid: req.body.meetupid,
     response: req.body.response,
 };

 //array push method for adding a new user into the data structure, array

 rsvpDB.push (addRSVP);

 //when successfully added, return a message of the success with the status code, OK

 return res.status(200).send({

         "success": "true",
         "message": "response submitted successfully"

 }) 


}


 //this function returns all RSVPS

 getAllRSVPs (req, res)
 {
     return res.status(200).send({
         "success": "true",
         "message": "RSVPS retrieved successfully",
         rsvpDB,
     });
 }

 //this function returns a specific user 

    getSpecificRSVP (req, res)
    {   
        //extracting the submitted id

        const id = req.params.id;

        //looping through the entire db to find a matching id and return the rsvp

        rsvpDB.map ((user, index) => {

            if (user.id === id)
            {
                return res.status(200).send({
                    "success": "true",
                    "message": "rsvp retrieved successfully",
                    user
                });
            }
        });

        //when there is no matching id, return RSVP not found with 404 status code

        return res.status(404).send({
            "success": "false",
            "message": "RSVP not found"
        });
    }

    

}



//creating an instance of the class Controller

const controller = new Controllers();

//exporting the controller object so that it can be used globally

module.exports = controller;
