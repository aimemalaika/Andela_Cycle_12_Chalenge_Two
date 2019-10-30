import express from 'express';

import storyController from '../controllers/story.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.post('/Add-Story', isAuth, storyController.addStory);

module.exports = route;
