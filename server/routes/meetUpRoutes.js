const express = require ('express');

const meetUpController = require ('../controllers/MeetUpController.js');

const meetUpRouter = express.Router();

meetUpRouter.get ('/api/v1/meetups/', meetUpController.getAllMeetUps);

meetUpRouter.get ('/api/v1/meetups/:id/', meetUpController.getSpecificMeetUp);

meetUpRouter.post ('/api/v1/meetups/', meetUpController.createMeetUp);

module.exports = meetUpRouter;
