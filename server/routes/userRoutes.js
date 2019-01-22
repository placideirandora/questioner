import express from 'express';

import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get ('/api/v1/users/', userController.getAllUsers);

userRouter.get ('/api/v1/users/:id/', userController.getSpecificUser);

userRouter.post ('/api/v1/users/', userController.createUser);


export default userRouter;



