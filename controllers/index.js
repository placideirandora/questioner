//importing uuid

const uuid = require ('uuid');

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
        //when firstname is not provided, a new user will not be created

        if (!req.body.firstname)
        {
            return res.status(400).send({
                "error": "firstname is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
                
            });
        }

        if (!req.body.lastname)
        {
            return res.status(400).send({
                "error": "lastname is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
                
            });
        }


        if (!req.body.username)
        {
            return res.status(400).send({
                "error": "username is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
                
            });
        }

        if (!req.body.email)
        {
            return res.status(400).send({
                "error": "email is required",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
            })
        }

        if (!req.body.phoneNumber)
        {
            return res.status(400).send({
                "error": "phone number is required",
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
                "error": "there are no users to retrieve. you should firstly add some users by using POST method.",
                "format": "firstname (required), lastname (required), othername (optional), email (required), phoneNumber (required), username (required) " 
   
            });
        }

        return res.status(200).send({
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
                    "success": "user retrieved successfully",
                    "user": user
                });
            }
        });

        //when there is no matching id, return user not found with 404 status code

        return res.status(404).send({
            "error": "user not found"
        });
    }

    //this function creates a new meetup

    createMeetUp (req, res)
    {   
        //when location is not provided, a new meetup will not be created


        if (!req.body.location)
        {
            return res.status(400).send({
                "error": "location is required",
                "format": "location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }

        if (!req.body.topic)
        {
            return res.status(400).send({
                "error": "topic is required",
                "format": "location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }

        if (!req.body.happeningOn)
        {
            return res.status(400).send({
                "error": "happeningOn (date of meetup) is required is required",
                "format": "location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }

        if (!req.body.tags)
        {
            return res.status(400).send({
                "error": "tags are required",
                "format": "location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }
        
        //an object of capturing the submitted data 

        const addMeetUp = {
            id: uuid.v4(),
            createdOn: new Date().toGMTString(),
            location: req.body.location,
            images: req.body.images,
            topic: req.body.topic,
            happeningOn: req.body.happeningOn,
            tags: req.body.tags,
        };

        //array push method for adding a new meetup into the data structure, array

        meetUpsDB.push (addMeetUp);

        //when successfully added, return a message of the success with the status code, OK

        return res.status(200).send({

                "success": "meetup created successfully",
                "meetup": addMeetUp

        });
    }

    //this function returns all meetups 

    getAllMeetUps (req, res)
    {   
        if (meetUpsDB == "")
        {
            return res.status(401).send({
                "error": "there are no meetups to retrieve. you should firstly add some meetups by using POST method.",
                "format": "location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
   
            });
        }

        return res.status(200).send({
            "success": "meetups retrieved successfully",
            "meetups": meetUpsDB
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
                    "success": "meetup retrieved successfully",
                    "meetup": meetup,
                });
            }
        });

       return res.status(404).send({
            "error": "meetup not found"
        });
    }

    //this function creates a new question

    createQuestion (req, res)
    {   
        //when username is not provided, a new question will not be created


        if (!req.body.createdBy)
        {
            return res.status(400).send({
                "error": "CreatedBy (the user who asked the question) is required",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
            
            });
        }

        if (!req.body.meetup)
        {
            return res.status(400).send({
                "error": "body (content of your question) is required",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
            });
        }

        if (!req.body.title)
        {
            return res.status(400).send({
                "error": "title (of your question) is required",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
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
            id: uuid.v4(),
            createdOn: new Date().toGMTString(),
            createdBy: req.body.createdBy,
            meetup: req.body.meetup,
            title: req.body.title,
            body: req.body.body,
            votes: 0
        };

        //array push method for adding a new question into the data structure, array

        questionsDB.push (addQuestion);

        //when successfully posted, return a message of the success with the status code, OK

        return res.status(200).send({

                "success": "question posted successfully",
                "question": addQuestion

        })
    }

     //this function returns all questions

     getAllQuestions (req, res)
     {

        if (questionsDB == "")
        {
            return res.status(401).send({
                "error": "there are no questions to retrieve. you should firstly add some questions by using POST method.",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
            });
        }

         return res.status(200).send({
             "success": "questions retrieved successfully",
             "questions": questionsDB
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
                     "success": "question retrieved successfully",
                     "question": question
                 });
             }
         });
 
        return res.status(404).send({
             "error": "question not found"
             
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
 //when id is not provided, a new meetup will not be created

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
