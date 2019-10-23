import express from 'express';

import authController from '../controllers/user.controller';

const route = express.Router();

route.post('/Login', authController.getLoginAuth);

module.exports = route;
