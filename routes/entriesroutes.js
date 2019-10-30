import express from 'express';

import storyController from '../controllers/story.controller';
import isAuth from '../middleware/is-auth';

const route = express.Router();

route.delete('/entries/:storyId', isAuth, storyController.deleteStory);
route.post('/entry', isAuth, storyController.addStory);
route.get('/entries', isAuth, storyController.getAllStories);
route.get('/entries/:storyId', isAuth, storyController.getOneStory);
route.patch('/entries/:storyId', isAuth, storyController.updateStory);

module.exports = route;
