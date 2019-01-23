import Joi from 'joi';

import databaseConnection from '../config/database';

import meetUpSchema from '../helpers/meetUpSchema.js';

import rsvpSchema from '../helpers/rsvpSchema.js';

import rsvpsDB from '../models/rsvpDB.js';

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
        'values($1, $2, $3, $4, $5)',

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




    createMeetUpRSVP(req, res)
    {


    const meetup = meetUpsDB.find(m => m.id === parseInt(req.params.id, 10));
    if (!meetup) {
        return res.status(404).send({
            status: 404,
            error: "meetup not found"
        });
    }
    
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


    const rsvp = {
    
        meetup: req.body.meetup,
        topic: req.body.topic,
        status: req.body.response,
    };
    
    rsvpsDB.push(rsvp);

    return res.status(201).send({

        "status": 201,
        "success": "meetup rsvp created successfully",
        "data": rsvp
});

        }
    }

    getMeetUpRSVP(req, res)
    {
        const meetup = meetUpsDB.find(m => m.id === parseInt(req.params.id, 10));
    if (!meetup) {
        return res.status(404).send({
            status: 404,
            error: "meetup not found"
        });
    }


    return res.status(200).send({
        "status": 200,
        "success": "meetup rsvp retrieved successfully",
        "data": rsvpsDB
    });




    }


    getUpcomingMeetUps(req, res)
    {
        
    meetUpsDB.sort((a, b) => {
        const result = new Date(a.happeningOn) - new Date(b.happeningOn);
        return result;
    });
    const data = [];
    meetUpsDB.forEach((meetup) => {
        
        if (new Date(meetup.happeningOn) >= new Date()) {
            data.push(meetup);
        }
    });


    return res.status(200).send({
        "status": 200,
        "success": "upcoming meetups",
        data
    });
}


    
}

const meetUpController = new meetUpControllers();

export default meetUpController;