import express from 'express';

import storyController from '../controllers/story.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.delete('/Delete-Story/:storyId', isAuth, storyController.deleteStory);

module.exports = route;
