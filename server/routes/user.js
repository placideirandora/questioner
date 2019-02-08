import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/', controller.registerUser);
router.get('/', controller.retrieveUsers);
router.get('/:id', controller.retrieveUser);

export default router;
