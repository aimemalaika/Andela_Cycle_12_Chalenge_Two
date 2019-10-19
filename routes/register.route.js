import express from 'express';


import authController from '../controllers/user.controller';


const route = express.Router();

route.get('/Register', authController.getRegisterAuth);

module.exports = route;
