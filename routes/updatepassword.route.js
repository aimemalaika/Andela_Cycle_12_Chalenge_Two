import express from 'express';


import authController from '../controllers/user.controller';


const route = express.Router();

route.patch('/Password-Update/:userId', authController.updatePassword);

module.exports = route;
