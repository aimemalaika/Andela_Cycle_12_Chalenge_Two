import express from 'express';


import authController from '../controllers/user.controller';


const route = express.Router();

route.post('/Register', authController.getRegisterAuth);

module.exports = route;
