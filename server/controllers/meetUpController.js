import Joi from 'joi';

import databaseConnection from '../config/database';

import meetUpSchema from '../helpers/meetUpSchema.js';

import questionSchema from '../helpers/questionSchema';

import rsvpSchema from '../helpers/rsvpSchema.js'

import commentSchema from '../helpers/commentSchema';

class meetUpControllers
{
    createMeetUp (req, res)
    {          
        const { error } = Joi.validate (req.body, meetUpSchema);

        if (error)
        {
            return res.status(400).send({
                "status": 400,
                "error": error.details[0].message
            })
        }

        else 

        {
        
        const addMeetUp = {
            topic: req.body.topic,
            location: req.body.location,
            happeningOn: req.body.happeningOn,
            tags: req.body.tags,
            images: req.body.images,
        };

        databaseConnection.query('INSERT INTO meetups(topic, location, happeningon, tags, images) '+
        'values($1, $2, $3, $4, $5) returning *',

        [addMeetUp.topic, addMeetUp.location, addMeetUp.happeningOn, addMeetUp.tags, addMeetUp.images])

         .then ( meetups => {

            return res.status(201).send({

                "status": 201,
                "success": "meetup created successfully",
                "data": meetups.rows
        

        });

         })
         
         .catch( error => {

             console.log(error);
         })

        }
}

    getAllMeetUps (req, res)
    {   

        databaseConnection.query ('SELECT * FROM meetups')

        .then( meetups => {

            return res.status(200).send({

                "status": 200,
                "success": "meetups retrieved successfully",
                "data": meetups.rows

            });
        })

        .catch( error => {

            console.log(error);

        })

    }

    getSpecificMeetUp(req, res)
    {
        const mid = parseInt(req.params.id, 10);

        databaseConnection.query ('SELECT * FROM meetups WHERE id = ' + mid)

        .then( meetups => {

            if (!meetups.rows.length) {

                return res.status(404).send({
                    status: 404,
                    error: 'meetup not found',
                });

            }

            return res.status(200).send({

                "status": 200,
                "success": "meetup retrieved successfully",
                "data": meetups.rows

            });
        })

        .catch( error => {

            console.log(error);

        })
    
    }



    deleteSpecificMeetUp(req, res)
    {
        
        const mid = parseInt(req.params.id, 10);

        databaseConnection.query ('SELECT * FROM meetups WHERE id = ' + mid)

        .then( meetups => {

            if (!meetups.rows.length) {

                return res.status(404).send({
                    status: 404,
                    error: 'meetup not found',
                });

            }

            databaseConnection.query('DELETE FROM meetups WHERE id =' + mid);

            return res.status(200).send({

                "status": 200,
                "success": "meetup deleted successfully",
        

            });
        })

        .catch( error => {

            console.log(error);

        })


    }





    createMeetUpRSVP(req, res)
    {


        const { error } = Joi.validate (req.body, rsvpSchema);

        if (error)
        {
            return res.status(400).send({
                "status": 400,
                "error": error.details[0].message
            })
        }

        else 

        {


            const respo = req.body.response;

            const meetupId = req.params.id;
            const userId = req.user.id;
    
    
    
            databaseConnection.query('INSERT INTO rsvps(meetup, userid, response) '+
            'values($1, $2, $3) returning *',
    
            [meetupId, userId, respo])
    
             .then ( rsvp => {
    
                return res.status(201).send({
    
                    "status": 201,
                    "success": "rsvp response submitted successfully",
                    "data": rsvp.rows
            
    
            });
    
             })
        

          }

    }


    getUpcomingMeetUps(req, res)
    {
        
        databaseConnection.query ('SELECT * FROM meetups ORDER BY happeningon ASC')

        .then( meetups => {

            return res.status(200).send({

                "status": 200,
                "success": "upcoming meetups retrieved successfully",
                "data": meetups.rows

            });
        })

        .catch( error => {

            console.log(error);

        })
    }

    createQuestion(req, res)
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
            
        
            title: req.body.title,
            body: req.body.body
        };

        const meetupId = req.params.id;
        const userId = req.user.id;



        databaseConnection.query('INSERT INTO questions(createdby, meetup, title, body) '+
        'values($1, $2, $3, $4) returning *',

        [userId, meetupId, addQuestion.title, addQuestion.body])

         .then ( questions => {

            return res.status(201).send({

                "status": 201,
                "success": "question posted successfully",
                "data": questions.rows
        

        });

         })
         
         .catch( error => {

             console.log(error);
         })

    }


}

upvoteQuestion (req, res)
{
    const userid = req.user.id;
    const qid = req.params.id;
        

        databaseConnection.query ('SELECT * FROM questions WHERE id = ' + qid)

        .then( questions => {

            if (!questions.rows.length) {

                return res.status(404).send({
                    status: 404,
                    error: 'question not found',
                });

            }

            let upvotes = + 1;
            databaseConnection.query("INSERT INTO votes(userid,question,upvotes,downvotes)VALUES($1,$2,$3,$4) returning *",
              [userid, qid, upvotes, 0])
              .then(voting => res.status(200).json({ 
                  success: true, message: "question upvoted successfully." ,
                  votes: voting.rows
                }))
              .catch((er) => {
                console.log(er);
              });

          
        })

        .catch( error => {

            console.log(error);

        })
    
}


commentQuestion(req, res)
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

        const qid = req.params.id;


        const addComment = {
            title: req.body.title,
            body: req.body.body,
            comment: req.body.comment


        }



        databaseConnection.query('INSERT INTO comments(questionid, title, body, comment) '+
        'values($1, $2, $3, $4) returning *',

        [qid, addComment.title, addComment.body, addComment.comment])

         .then ( comment => {

            return res.status(201).send({

                "status": 201,
                "success": "comment posted successfully",
                "data": comment.rows
        

        });

         })
    

      }

}

getAllQuestions (req, res)
{   
    const meetupId = req.body.id;

    databaseConnection.query ('SELECT * FROM questions WHERE meetup ='+ meetupId)

    .then( questions => {

        return res.status(200).send({

            "status": 200,
            "success": "questions retrieved successfully",
            "data": questions.rows

        });
    })

    .catch( error => {

        console.log(error);

    })

}




}

const meetUpController = new meetUpControllers();

export default meetUpController;