import express from 'express';

import authController from '../controllers/user.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.patch('/Reset-Password', isAuth, authController.recoverPassword);

module.exports = route;
