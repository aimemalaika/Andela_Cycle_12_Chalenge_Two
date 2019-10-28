import express from 'express';

import storyController from '../controllers/story.controller';

const route = express.Router();

route.patch('/Update-Story/:storyId', storyController.updateStory);

module.exports = route;
