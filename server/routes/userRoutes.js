import express from 'express';

import userController from '../controllers/userController.js';

import tokenVerification from '../middleware/tokenVerification';

const userRouter = express.Router();

userRouter.get ('/api/v1/users/', tokenVerification.verifyToken, userController.getAllUsers);

userRouter.get ('/api/v1/users/:id/', tokenVerification.verifyToken, userController.getSpecificUser);

userRouter.post ('/api/v1/users/auth/signup', userController.createUser);

userRouter.post ('/api/v1/users/auth/login', userController.loginUser);

export default userRouter;




