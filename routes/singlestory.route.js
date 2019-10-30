import express from 'express';

import storyController from '../controllers/story.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.get('/Read-Story/:storyId', isAuth, storyController.getOneStory);

module.exports = route;
