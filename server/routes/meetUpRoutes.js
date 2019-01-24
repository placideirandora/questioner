import express from 'express';

import meetUpController from '../controllers/meetUpController.js';

import tokenVerification from '../middleware/tokenVerification';

const meetUpRouter = express.Router();

meetUpRouter.get ('/api/v1/meetups/', tokenVerification.verifyToken, meetUpController.getAllMeetUps);

meetUpRouter.get ('/api/v1/meetups/upcoming/', meetUpController.getUpcomingMeetUps);

meetUpRouter.get ('/api/v1/meetups/:id/', tokenVerification.verifyToken, meetUpController.getSpecificMeetUp);

meetUpRouter.post ('/api/v1/meetups/', tokenVerification.verifyToken, meetUpController.createMeetUp);

meetUpRouter.get ('/api/v1/meetups/:id/rsvps/', meetUpController.getMeetUpRSVP);

meetUpRouter.post ('/api/v1/meetups/:id/rsvps/', meetUpController.createMeetUpRSVP);

export default meetUpRouter;


