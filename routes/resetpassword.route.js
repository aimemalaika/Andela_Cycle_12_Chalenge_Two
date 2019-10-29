import express from 'express';

import authController from '../controllers/user.controller';

const route = express.Router();

route.patch('/Reset-Password', authController.recoverPassword);

module.exports = route;
