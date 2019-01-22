import express from 'express';

import questionController from '../controllers/questionController.js';

const questionRouter = express.Router();

questionRouter.get ('/api/v1/questions/', questionController.getAllQuestions);

questionRouter.get ('/api/v1/questions/:id/', questionController.getSpecificQuestion);

questionRouter.post ('/api/v1/questions/', questionController.createQuestion);

questionRouter.patch ('/api/v1/questions/:id/upvote/', questionController.upvoteQuestion);

questionRouter.patch ('/api/v1/questions/:id/downvote/', questionController.downvoteQuestion);


export default questionRouter;