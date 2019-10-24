import express from 'express';


import authController from '../controllers/user.controller';


const route = express.Router();

route.put('/Profile/:userId', authController.updateUser);

module.exports = route;
