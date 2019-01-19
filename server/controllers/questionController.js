
const uuid = require ('uuid');

const questionsDB = require ('../models/questionDB.js');

class questionControllers

{

     
    createQuestion (req, res)
    {   


        if (!req.body.createdBy)
        {
            return res.status(400).send({
                "status": 400,
                "error": "CreatedBy (the user who asked the question) is required",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
            
            });
        }

        if (!req.body.meetup)
        {
            return res.status(400).send({
                "status": 400,
                "error": "body (content of your question) is required",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
            });
        }

        if (!req.body.title)
        {
            return res.status(400).send({
                "status": 400,
                "error": "title (of your question) is required",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
            });
        }

        if (!req.body.body)
        {
            return res.status(400).send({
                "status": 400,
                "success": "false",
                "message": "the content of the question is required",
            })
        }
        

        const addQuestion = {
            id: uuid.v4(),
            createdOn: new Date().toGMTString(),
            createdBy: req.body.createdBy,
            meetup: req.body.meetup,
            title: req.body.title,
            body: req.body.body,
        
        };


        questionsDB.push (addQuestion);


        return res.status(201).send({
                "status": 201,
                "success": "question posted successfully",
                "data": addQuestion

        })
    }


     getAllQuestions (req, res)
     {

        if (questionsDB == "")
        {
            return res.status(401).send({
                "status": 401,
                "error": "there are no questions to retrieve. you should firstly add some questions by using POST method.",
                "format": "createdBy (user id is required), meetup (meetup id is required), title (required), body (required) "
            });
        }

         return res.status(200).send({
             "status": 200,
             "success": "questions retrieved successfully",
             "data": questionsDB
         });
     }
 

 
     getSpecificQuestion(req, res)
     {
         const id = req.params.id;
 
         questionsDB.map ((question, index) => {
             if (question.id === id)
             {
                 return res.status(200).send({
                     "status": 200,
                     "success": "question retrieved successfully",
                     "data": question
                 });
             }
         });
 
        return res.status(404).send({
             "status": 404,
             "error": "question not found"
             
         });
     }


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
                "status": 404,
                 "error": "question not found"
            
            });
        }
    
        const updateTheQuestion = {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: 1
        };
    
     //   questionsDB.splice (itemIndex, 1, updateTheQuestion);
    
        return res.status (200).send ({
            "status": 200,
            "success": 'question upvoted successfully',
            "data":
            updateTheQuestion,
        });

     }


     downvoteQuestion (req, res)
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
                "status": 404,
                 "error": "question not found"
            
            });
        }
    
        const updateTheQuestion = {
            meetup: questionFound.meetup,
            title: questionFound.title,
            body: questionFound.body,
            votes: 1
        };
    
     //   questionsDB.splice (itemIndex, 1, updateTheQuestion);
    
        return res.status (200).send ({
            "status": 200,
            "success": 'question downvoted successfully',
            "data":
            updateTheQuestion,
        });

    }


}

const questionController = new questionControllers();

module.exports = questionController;