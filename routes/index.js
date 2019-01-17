//importing express

const express = require ('express');

//importing the controllers

const controller = require ('../controllers/index.js');

//setting up the router

const router = express.Router();

//handling the routes

//route for creating a new user

router.post ('/api/v1/users', controller.createUser);

//route for retrieving all users

router.get ('/api/v1/users', controller.getAllUsers);

//route for retrieving a specific user according to the id

router.get ('/api/v1/users/:id', controller.getSpecificUser);

//route for creating a new meetup 

router.post ('/api/v1/meetups', controller.createMeetUp);

//route for retrieving all meetups

router.get ('/api/v1/meetups', controller.getAllMeetUps);

//route for retrieving a specific meetup according to the id

router.get ('/api/v1/meetups/:id', controller.getSpecificMeetUp);

//route for responding to a specific meetup (RSVP)

router.get ('/api/v1/meetups/:id/rsvp', controller.createRSVP)

//route for creating a new question

router.post ('/api/v1/questions', controller.createQuestion);

//route for retrieving all questions

router.get ('/api/v1/questions', controller.getAllQuestions);

//route for retrieving a specific question

router.get ('/api/v1/questions/:id', controller.getSpecificQuestion);

//route for upvoting a specific question

router.patch ('/api/v1/questions/:id/upvote', controller.upvoteQuestion);

//route for downvoting a specific question

router.patch ('/api/v1/questions/:id/downvote', controller.downvoteQuestion);

//route for creating or submitting an RSVP

router.post ('/api/v1/rsvp', controller.createRSVP);

//route for retrieving all RSVPS

router.get ('/api/v1/rsvp', controller.getAllRSVPs);

//retrieving a specific RSVP

router.get ('/api/v1/rsvp/:id', controller.getSpecificRSVP);

//exporting the router method so that it can be used globally
router.get('/index',(req,res)=>{
    res.render('index');
});

module.exports = router;

