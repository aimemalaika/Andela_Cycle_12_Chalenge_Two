import express from 'express';

import storyController from '../controllers/story.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.patch('/Update-Story/:storyId', isAuth, storyController.updateStory);

module.exports = route;
