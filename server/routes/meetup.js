import express from 'express';
import controller from '../controllers/meetup';

const router = express.Router();

router.get('/upcoming', controller.retrieveUpcomingMeetUps);
router.post('/', controller.createMeetUp);
router.get('/:id', controller.retrieveSpecificMeetUp);
router.get('/', controller.retrieveAllMeetUps);
router.post('/:id/rsvps', controller.submitRSVP);
router.get('/:id/rsvps', controller.retrieveMeetUpRSVP);
router.post('/:id/questions', controller.postQuestion);

export default router;
