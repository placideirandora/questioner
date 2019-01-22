import express from 'express';

import meetUpController from '../controllers/meetUpController.js';

const meetUpRouter = express.Router();

meetUpRouter.get ('/api/v1/meetups/', meetUpController.getAllMeetUps);

meetUpRouter.get ('/api/v1/meetups/upcoming/', meetUpController.getUpcomingMeetUps);

meetUpRouter.get ('/api/v1/meetups/:id/', meetUpController.getSpecificMeetUp);

meetUpRouter.post ('/api/v1/meetups/', meetUpController.createMeetUp);

meetUpRouter.get ('/api/v1/meetups/:id/rsvps/', meetUpController.getMeetUpRSVP);

meetUpRouter.post ('/api/v1/meetups/:id/rsvps/', meetUpController.createMeetUpRSVP);

export default meetUpRouter;


