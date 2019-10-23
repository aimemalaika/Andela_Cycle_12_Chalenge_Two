import express from 'express';

import storyController from '../controllers/story.controller';

const route = express.Router();

route.get('/All-Story', storyController.getAllStories);

module.exports = route;
