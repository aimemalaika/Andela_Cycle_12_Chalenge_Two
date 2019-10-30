import express from 'express';


import authController from '../controllers/user.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();


route.patch('/profile/:userId', isAuth, authController.updateUser);
route.patch('/updatepassword/:userId', isAuth, authController.updatePassword);
route.post('/signin', authController.getLoginAuth);
route.post('/signup', authController.getRegisterAuth);

module.exports = route;
