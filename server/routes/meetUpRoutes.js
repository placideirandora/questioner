import express from 'express';

import meetUpController from '../controllers/meetUpController.js';

import tokenVerification from '../middleware/tokenVerification';

const meetUpRouter = express.Router();

meetUpRouter.get ('/api/v1/meetups/', tokenVerification.verifyToken, meetUpController.getAllMeetUps);

meetUpRouter.get ('/api/v1/meetups/upcoming/', tokenVerification.verifyToken, meetUpController.getUpcomingMeetUps);

meetUpRouter.get ('/api/v1/meetups/:id/', tokenVerification.verifyToken, meetUpController.getSpecificMeetUp);

meetUpRouter.delete ('/api/v1/meetups/:id/', tokenVerification.verifyToken, meetUpController.deleteSpecificMeetUp);

meetUpRouter.post ('/api/v1/meetups/', tokenVerification.verifyToken, meetUpController.createMeetUp);

//meetUpRouter.get ('/api/v1/meetups/:id/rsvps/', tokenVerification.verifyToken, meetUpController.getMeetUpRSVP);

meetUpRouter.post ('/api/v1/meetups/:id/rsvps/', tokenVerification.verifyToken, meetUpController.createMeetUpRSVP);

//meetUpRouter.post ('/api/v1/meetups/:id/rsvps/', tokenVerification.verifyToken, meetUpController.createMeetUpTags);

//meetUpRouter.post ('/api/v1/meetups/:id/rsvps/', tokenVerification.verifyToken, meetUpController.createMeetUpImages);

meetUpRouter.post ('/api/v1/meetups/:id/questions/', tokenVerification.verifyToken, meetUpController.createQuestion);

meetUpRouter.get ('/api/v1/meetups/:id/questions/', tokenVerification.verifyToken, meetUpController.getAllQuestions);

meetUpRouter.patch ('/api/v1/meetups/:id/questions/:id/upvote', tokenVerification.verifyToken, meetUpController.upvoteQuestion);

meetUpRouter.post ('/api/v1/meetups/:id/questions/:id/comments', tokenVerification.verifyToken, meetUpController.commentQuestion);

//meetUpRouter.patch ('/api/v1/meetups/:id/questions/:id/downvote', tokenVerification.verifyToken, meetUpController.downvoteQuestion);

export default meetUpRouter;

