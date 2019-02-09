import express from 'express';
import controller from '../controllers/user';
import authenticate from '../helpers/authenticate';

const router = express.Router();

router.post('/signup', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/', authenticate.verifyAdmin, controller.retrieveUsers);
router.delete('/:id', authenticate.verifyAdmin, controller.deleteUser);
router.get('/:id', authenticate.verifyAdmin, controller.retrieveUser);

export default router;
