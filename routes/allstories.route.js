import express from 'express';

import storyController from '../controllers/story.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.get('/All-Story', isAuth, storyController.getAllStories);

module.exports = route;
