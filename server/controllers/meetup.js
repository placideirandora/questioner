import Joi from 'joi';
import  meetUp  from '../models/meetup';
import dummy from '../models/dummy';
import validate from '../middleware/validate';

const meetups = {
    createMeetUp(req, res) {
        const {
          location, images, topic, happeningOn, tags,
        } = req.body;
    
        const { error } = Joi.validate({
          location, images, topic, happeningOn, tags,
        }, validate.meetupSchema);
    
        if (error) {
          res.status(400).json({ error: error.details[0].message });
        } else {
          const id = dummy.meetups.length + 1;
          const meetup = new meetUp(id, location, images, topic, happeningOn, tags);
          dummy.meetups.push(meetup);
            res.status(201).json({
              status: 201,
              success: 'meetup created',
              data: {
                meetup
              },
            });
        }
        },

    retrieveAllMeetUps (req, res)
    {   
        res.status(200).json({
            status: 200,
            success: 'meetups retrieved successfully',
            data: dummy      
        });
    },

    retrieveSpecificMeetUp(req, res)
    {
        const meetupId = parseInt( req.params.id, 10);
        const { error } = Joi.validate({
            meetupId,
          }, validate.meetupParams);
      
          if (error) {
            res.status(400).json({ error: error.details[0].message });
          } else {
            dummy.meetups.map ((meetup) => {
            if (meetup.id === meetupId)
            {
                    res.status(200).json({
                    status: 200,
                    success: 'meetup retrieved successfully',
                    data: meetup,
                });
            }
        });

           res.status(404).json({
           status: 404,
           error: 'meetup not found'
        });
    }
    },

    submitRSVP(req, res)
    {
    const meetupId = parseInt(req.params.id, 10);
    const { error } = Joi.validate({
        meetupId,
      }, validate.meetupParams);
  
      if (error) {
        res.status(400).json({ error: error.details[0].message });
      } else {
    const meetup = dummy.meetups.find(meetup => meetup.id === meetupId);
    if (!meetup) {
            res.status(404).send({
            status: 404,
            error: 'meetup not found'
        });
    }
    
    const { response } = req.body;   
    const { error } = Joi.validate ({response}, validate.rsvpSchema);

        if (error)
        {
            res.status(400).send({
                'status': 400,
                'error': error.details[0].message
            })
        }
        else 
        {
        const rsvp = {
        meetup: req.params.id,
        status: req.body.response,
    };
    
    dummy.rsvps.push(rsvp);
        res.status(201).send({
        status: 201,
        success: 'rsvp submitted',
        data: rsvp
});     
}}
    },

    retrieveMeetUpRSVP(req, res)
    {
        const meetup = dummy.meetups.find(m => m.id === parseInt(req.params.id, 10));
        if (!meetup) {
        res.status(404).json({
            status: 404,
            error: 'meetup not found'
        });
    }

    if (dummy.rsvps.length === 0)
    {
        res.status(400).json({
            status: 400,
            success: 'no meetup rsvp found',
        }); 
    }

        res.status(200).json({
        status: 200,
        success: 'meetup rsvp retrieved successfully',
        data: dummy.rsvps
    });
    },


    retrieveUpcomingMeetUps(req, res)
    {  
            dummy.meetups.sort((a, b) => {
            const result = new Date(a.happeningOn) - new Date(b.happeningOn);
            return result;
    });
         const data = [];
         dummy.meetups.forEach((meetup) => {
         if (new Date(meetup.happeningOn) >= new Date()) {
            data.push(meetup);
        }
    });

    res.status(200).send({
        'status': 200,
        'success': "upcoming meetups",
        data
    });
},    
};

export default meetups;