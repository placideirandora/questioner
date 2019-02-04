import express from 'express';
import auth from '../helpers/authenticate';
import controller from '../controllers/meetup';

const router = express.Router();

router.get('/upcoming', auth.verifyUser, controller.retrieveUpcomingMeetUps);
router.post('/', auth.verifyAdmin, controller.createMeetUp);
router.get('/:id', auth.verifyAdmin, controller.retrieveSpecificMeetUp);
router.get('/', auth.verifyAdmin, controller.retrieveAllMeetUps);
router.delete('/:id', auth.verifyAdmin, controller.deleteSpecificMeetUp);
router.post('/:id/rsvps', auth.verifyUser, controller.submitRSVP);
router.post('/:id/questions', auth.verifyUser, controller.postQuestion);

export default router;
