import Joi from 'joi';

import databaseConnection from '../config/database';

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
            createdBy: req.body.createdBy,
            meetup: req.body.meetup,
            title: req.body.title,
            body: req.body.body,
        
        
        };


        databaseConnection.query('INSERT INTO questions(createdby, meetup, title, body) '+
        'values($1, $2, $3, $4)',

        [addQuestion.createdBy, addQuestion.meetup, addQuestion.title, addQuestion.body])

         .then ( questions => {

            return res.status(201).send({

                "status": 201,
                "success": "question posted successfully",
        

        });

         })
         
         .catch( error => {

             console.log(error);
         })

    }

}


     getAllQuestions (req, res)
     {

        databaseConnection.query ('SELECT * FROM questions')

        .then( questions => {

            return res.status(200).send({

                "status": 200,
                "success": "users retrieved successfully",
                "data": questions.rows

            });
        })

        .catch( error => {

            console.log(error);

        })

     }
 

 
     getSpecificQuestion(req, res)
     {
        const qid = parseInt(req.params.id, 10);
 
        databaseConnection.query ('SELECT * FROM questions WHERE id = ' + qid)

        .then( questions => {

            return res.status(200).send({

                "status": 200,
                "success": "user retrieved successfully",
                "data": questions.rows

            });
        })

        .catch( error => {

            console.log(error);

        })
       
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