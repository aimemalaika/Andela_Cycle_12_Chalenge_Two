import express from 'express';

import storyController from '../controllers/story.controller';

const route = express.Router();

route.get('/Read-Story/:storyId', storyController.getOneStory);

module.exports = route;
