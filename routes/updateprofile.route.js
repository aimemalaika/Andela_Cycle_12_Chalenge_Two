import express from 'express';


import authController from '../controllers/user.controller';


const route = express.Router();

route.patch('/Profile/:userId', authController.updateUser);

module.exports = route;
