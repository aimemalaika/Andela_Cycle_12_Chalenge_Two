import express from 'express';

import authController from '../controllers/user.controller';

const route = express.Router();

route.post('/Reset-Password', authController.recoverPassword);

module.exports = route;
