import express from 'express';
import auth from '../helpers/authenticate';
import controller from '../controllers/meetup';

const router = express.Router();

router.get('/upcoming', auth.verifyUser, controller.upcoming);
router.post('/', auth.verifyAdmin, controller.createMeetup);
router.get('/:id', auth.verifyAdmin, controller.getOneMeetup);
router.get('/', auth.verifyAdmin, controller.getAllMeetup);
router.delete('/:id', auth.verifyAdmin, controller.deleteOneMeetup);
router.post('/:id/rsvps', auth.verifyUser, controller.respondToMeetup);
router.post('/:id/questions', auth.verifyUser, controller.askQuestion);

export default router;
