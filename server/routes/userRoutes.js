const express = require ('express');

const userController = require ('../controllers/userController.js');

const userRouter = express.Router();

userRouter.get ('/api/v1/users/', userController.getAllUsers);
userRouter.get ('/api/v1/users/:id/', userController.getSpecificUser);

userRouter.post ('/api/v1/users/', userController.createUser);


module.exports = userRouter;



