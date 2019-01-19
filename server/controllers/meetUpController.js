//importing the meetups database 

const meetUpsDB = require ('../models/meetUpDB.js');

class meetUpControllers
{

    createMeetUp (req, res)
    {   
        
        if (!req.body.id)
        {
            return res.status(400).send({
                "status": 400,
                "error": "id (the id of the meetup) is required",
                "format": "id (required), location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }

        if (!req.body.location)
        {
            return res.status(400).send({
                "status": 400,
                "error": "location is required",
                "format": "id (required),location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }
        

        if (!req.body.topic)
        {
            return res.status(400).send({
                "status": 400,
                "error": "topic is required",
                "format": "id (required), location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }

        if (!req.body.happeningOn)
        {
            return res.status(400).send({
                "status": 400,
                "error": "happeningOn (date of meetup) is required is required",
                "format": "id (required), location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }

        if (!req.body.tags)
        {
            return res.status(400).send({
                "status": 400,
                "error": "tags are required",
                "format": "id (required), location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
            });
        }
        
        //an object of capturing the submitted data 

        const addMeetUp = {
            id: req.body.id,
            createdOn: new Date().toGMTString(),
            location: req.body.location,
            images: req.body.images,
            topic: req.body.topic,
            happeningOn: req.body.happeningOn,
            tags: req.body.tags,
        };


        meetUpsDB.push (addMeetUp);


        return res.status(201).send({

                "status": 201,
                "success": "meetup created successfully",
                "data": addMeetUp

        });
    }



    getAllMeetUps (req, res)
    {   
        if (meetUpsDB == "")
        {
            return res.status(401).send({
                "status": 401,
                "error": "there are no meetups to retrieve. you should firstly add some meetups by using POST method.",
                "format": "id (required), location (required), images (optional), topic (required), happeningOn (required), tags (required) " 
   
            });
        }

        return res.status(200).send({
            "status": 200,
            "success": "meetups retrieved successfully",
            "data": meetUpsDB
        });
    }

    getSpecificMeetUp(req, res)
    {
        const id = parseInt(req.params.id, 10);

        meetUpsDB.map ((meetup, index) => {
            if (meetup.id === id)
            {
                return res.status(200).send({
                    "status": 200,
                    "success": "meetup retrieved successfully",
                    "data": meetup,
                });
            }
        });

       return res.status(404).send({
           "status": 404,
            "error": "meetup not found"
        });
    }
    
}

const meetUpController = new meetUpControllers();

module.exports = meetUpController;