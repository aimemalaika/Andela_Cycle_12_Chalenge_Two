import express from 'express';

import storyController from '../controllers/story.controller';

const route = express.Router();

route.put('/Update-Story/:storyId', storyController.updateStory);

module.exports = route;
