import express from 'express';

import storyController from '../controllers/story.controller';

const route = express.Router();

route.delete('/Delete-Story/:storyId', storyController.deleteStory);

module.exports = route;
