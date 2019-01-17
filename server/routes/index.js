
const express = require ('express');

const userController = require ('../controllers/userController.js');

const meetUpController = require ('../controllers/meetUpController.js');

const questionController = require ('../controllers/questionController.js');

const router = express.Router();

//handling the routes

router.post ('/api/v1/users', userController.createUser);

router.get ('/api/v1/users', userController.getAllUsers);

router.get ('/api/v1/users/:id', userController.getSpecificUser);

router.post ('/api/v1/meetups', meetUpController.createMeetUp);

router.get ('/api/v1/meetups', meetUpController.getAllMeetUps);

router.get ('/api/v1/meetups/:id', meetUpController.getSpecificMeetUp);

router.post ('/api/v1/questions', questionController.createQuestion);

router.get ('/api/v1/questions', questionController.getAllQuestions);

router.get ('/api/v1/questions/:id', questionController.getSpecificQuestion);

router.patch ('/api/v1/questions/:id/upvote', questionController.upvoteQuestion);

router.patch ('/api/v1/questions/:id/downvote', questionController.downvoteQuestion);

router.get ('/index', (req, res) => {

    res.render('index');

});

module.exports = router;


