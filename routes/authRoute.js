import express from 'express';


import authController from '../controllers/userController';
import isAuth from '../middleware/isAuth';

const route = express.Router();

route.patch('/resetpassword', authController.recoverPassword);
route.patch('/profile', isAuth, authController.updateUser);
route.patch('/updatepassword', isAuth, authController.updatePassword);
route.post('/signin', authController.getLoginAuth);
route.post('/signup', authController.getRegisterAuth);

module.exports = route;
