import express from 'express';

import storyController from '../controllers/story.controller';

const route = express.Router();

route.post('/Add-Story', storyController.addStory);

module.exports = route;
