import express from 'express';
import controller from '../controllers/question';

const router = express.Router();

router.patch('/:id/upvote', controller.upvote);
router.patch('/:id/downvote', controller.downvote);
router.get('/:id', controller.retrieveMeetUpQuestions);

export default router;
