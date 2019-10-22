import express from 'express';


import storyController from '../controllers/story.controller';

const route = express.Router();

route.post('/api/v1/Add', storyController.addStory);
