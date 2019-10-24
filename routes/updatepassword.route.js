import express from 'express';


import authController from '../controllers/user.controller';


const route = express.Router();

route.put('/Password-Update/:userId', authController.updatePassword);

module.exports = route;
