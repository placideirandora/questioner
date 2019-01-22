import Joi from 'joi';

import questionsDB from '../models/questionDB.js';

import questionSchema from '../helpers/questionSchema.js';

class questionControllers

{

     
    createQuestion (req, res)
    {   

        const { error } = Joi.validate (req.body, questionSchema);

        if (error)
        {
            return res.status(400).send({
                "status": 400,
                "error": error.details[0].message
            })
        }

        else 

        {

        const addQuestion = {
            id: questionsDB.length + 1,
            createdOn: new Date().toGMTString(),
            createdBy: req.body.createdBy,
            meetup: req.body.meetup,
            title: req.body.title,
            body: req.body.body,
            upvotes: 0,
            downvotes: 0
        
        };


        questionsDB.push (addQuestion);


        return res.status(201).send({
                "status": 201,
                "success": "question posted successfully",
                "data": addQuestion

        })
    }

}


     getAllQuestions (req, res)
     {

         return res.status(200).send({
             "status": 200,
             "success": "questions retrieved successfully",
             "data": questionsDB
         });
     }
 

 
     getSpecificQuestion(req, res)
     {
        const id = parseInt(req.params.id, 10);
 
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
        
        const uqid = parseInt(req.params.id, 10);
        const arrIndex = questionsDB.findIndex(q => q.id === parseInt(req.params.id, 10));

        let questionFound;
        let itemIndex;
    
        questionsDB.map ((findQuestion, index) => {
            if (findQuestion.id === uqid) 
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
            votes: questionsDB[arrIndex].upvotes++
        };
    
        return res.status (200).send ({
            "status": 200,
            "success": 'question upvoted successfully',
            "data":
            updateTheQuestion,
        });

    }

     


     downvoteQuestion (req, res)
     {
           
        const dqid = parseInt(req.params.id, 10);
        const arrIndex = questionsDB.findIndex(q => q.id === parseInt(req.params.id, 10));

        let questionFound;
        let itemIndex;
    
        questionsDB.map ((findQuestion, index) => {
            if (findQuestion.id === dqid) 
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
            votes: questionsDB[arrIndex].downvotes++
        };

    
        return res.status (200).send ({
            "status": 200,
            "success": 'question downvoted successfully',
            "data":
            updateTheQuestion,
        });

    }


}

const questionController = new questionControllers();

export default questionController;