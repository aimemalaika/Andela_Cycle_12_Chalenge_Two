import express from 'express';


import authController from '../controllers/userController';
import isAuth from '../middleware/isAuth';
import isValid from '../middleware/validateMiddleware';

const route = express.Router();

route.patch('/resetpassword', authController.recoverPassword);
route.patch('/profile', isAuth, authController.updateUser);
route.patch('/updatepassword', isAuth, authController.updatePassword);
route.post('/signin', isValid.validateinput, authController.getLoginAuth);
route.post('/signup', isValid.validateinput, authController.getRegisterAuth);

module.exports = route;
