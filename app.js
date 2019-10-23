import express from 'express';
import bodyParser from 'body-parser';

import registerRoute from './routes/register.route';
import loginRoute from './routes/login.route';
import addStoryRoute from './routes/createstory.route';
import readStory from './routes/singlestory.route';
import allStories from './routes/allstories.route';

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allowed-Methods', 'GET', 'POST', 'PUT');
  res.setHeader('Access-Control-Allowed-Headers', 'Content-Type', 'Authorisation');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api/v1/auth', registerRoute);
app.use('/api/v1/auth', loginRoute);
app.use('/api/v1', addStoryRoute);
app.use('/api/v1', readStory);
app.use('/api/v1', allStories);

app.listen(3000);
