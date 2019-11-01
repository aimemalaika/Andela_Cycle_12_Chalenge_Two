import express from 'express';


import authController from '../controllers/user.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.patch('/resetpassword', authController.recoverPassword);
route.patch('/profile', isAuth, authController.updateUser);
route.patch('/updatepassword', isAuth, authController.updatePassword);
route.post('/signin', authController.getLoginAuth);
route.post('/signup', authController.getRegisterAuth);

module.exports = route;
