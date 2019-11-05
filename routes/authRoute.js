import express from 'express';


import authController from '../controllers/userController';
import isAuth from '../middleware/isAuth';
import isValid from '../middleware/validateMiddleware';

const route = express.Router();

route.patch('/resetpassword', authController.recoverPassword);
route.patch('/profile', isAuth, isValid.validateProfile, authController.updateUser);
route.patch('/updatepassword', isAuth, isValid.validateEmail, authController.updatePassword);
route.post('/signin', isValid.validateLogin, authController.getLoginAuth);
route.post('/signup', isValid.validateRegistration, authController.getRegisterAuth);

module.exports = route;
