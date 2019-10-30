import express from 'express';


import authController from '../controllers/user.controller';
import isAuth from '../middleware/is-auth';


const route = express.Router();

route.patch('/Password-Update/:userId', isAuth, authController.updatePassword);

module.exports = route;
