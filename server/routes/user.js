import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.post('/signup', controller.register);
router.post('/login', controller.login);

export default router;
