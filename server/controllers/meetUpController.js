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

            const meetupId = parseInt(req.params.id, 10);
            const userId = req.user.id;
    
    
    
            databaseConnection.query('INSERT INTO rsvps(meetup, userid, status) '+
            'values($1, $2, $3)',
    
            [meetupId, userId, respo]),

            databaseConnection.query('SELECT status FROM rsvps WHERE meetup =' + meetupId)

            databaseConnection.query('SELECT topic FROM meetups WHERE id =' + meetupId)
    
             .then ( rsvp => {
    
                return res.status(201).send({
    
                    "STATUS": 201,
                    "success": "rsvp response submitted successfully",
                    "meetup": meetupId,
                    "topic": rsvp.rows[0].topic,
                    "status": respo
            
    
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

        const meetupId = parseInt(req.params.id, 10);
        const userId = req.user.id;



        databaseConnection.query('INSERT INTO questions(createdby, meetup, title, body) '+
        'values($1, $2, $3, $4) returning *',

        [userId, meetupId, addQuestion.title, addQuestion.body])

         .then ( questions => {

            return res.status(201).send({

                "status": 201,
                "success": "question posted successfully",
                "user": userId,
                "meetup": meetupId,
                "title": addQuestion.title,
                "body": addQuestion.body
        

        });

         })
         
         .catch( error => {

             console.log(error);
         })

    }


}



upvoteQuestion (req, res)
{

    const qid = req.params.id;
    const userId = req.user.id;
    const meetupId = parseInt(req.params.id, 10);
        

        databaseConnection.query ('SELECT * FROM questions WHERE id = ' + qid)

        .then( questions => {

            if (!questions.rows.length) {

                return res.status(404).send({
                    status: 404,
                    error: 'question not found',
                });

            }

          /*  databaseConnection.query ("SELECT title, body FROM questions WHERE id =" + qid)
        
            .then( questions => {
    
                if (!questions.rows.length) {
    
                    return res.status(404).send({
                        status: 404,
                        error: 'user not found',
                    });
    
                }
    
                return res.status(200).send({
    
                    "success": "title and body retrieved successfully",
                    "data": questions.rows
    
                });
            }) */

            

          let upvota = 0;
            
            let upvote = databaseConnection.query ("UPDATE votes SET upvotes = upvotes + 1 WHERE questionid =" + qid)

            let upvotes = databaseConnection.query("SELECT upvotes FROM votes WHERE questionid =" + qid +"AND "+upvota  +"=upvotes");

            databaseConnection.query("INSERT INTO votes(userid,questionid,upvotes,downvotes)VALUES($1,$2,$3,$4) returning *",
              [userId, qid, upvote, 0])

              databaseConnection.query ("SELECT title, body FROM questions WHERE id =" + qid)

              .then(voting => res.status(200).json({ 

                  "success": 200, 
                  "message": "question upvoted successfully.",
                  "meetup": meetupId,
                  "title": voting.rows[0].title,
                  "body": voting.rows[0].body,
                  "votes": upvota

                  
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

        const qid = parseInt( req.params.id, 0);


        

            const comment = req.body.comment;


        



        databaseConnection.query('INSERT INTO comments(questionid, comment) '+
        'values($1, $2) returning *',

        [qid, comment])

        databaseConnection.query ('SELECT title, body FROM questions WHERE id ='+ qid)

         .then ( result => {

            return res.status(201).send({

                "status": 201,
                "success": "comment posted successfully",
                "question": qid,
                "title": result.rows[0].title,
                "body": result.rows[0].body,
                "comment": comment
        

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