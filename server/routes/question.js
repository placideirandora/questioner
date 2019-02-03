import express from 'express';
import auth from '../helpers/authenticate';
import controller from '../controllers/question';

const router = express.Router();

router.patch('/:id/upvote', auth.verifyUser, controller.upvote);
router.patch('/:id/downvote', auth.verifyUser, controller.downvote);
router.get('/:id', auth.verifyUser, controller.questionForMeetups);
router.post('/:id/comments', auth.verifyUser, controller.commentForQuestions);

export default router;
