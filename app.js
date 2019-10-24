import express from 'express';
import bodyParser from 'body-parser';

import registerRoute from './routes/register.route';
import loginRoute from './routes/login.route';
import addStoryRoute from './routes/createstory.route';
import readStoryRoute from './routes/singlestory.route';
import allStoriesRoute from './routes/allstories.route';
import deleteStoryRoute from './routes/deletestory.route';
import updateStoryRoute from './routes/editstory.route';
import updateProfile from './routes/updateprofile.route';
import PasswordReset from './routes/resetpassword.route';
import passwordUpdate from './routes/updatepassword.route';

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allowed-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  res.setHeader('Access-Control-Allowed-Headers', 'Content-Type', 'Authorisation');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api/v1/auth', registerRoute);
app.use('/api/v1/auth', loginRoute);
app.use('/api/v1/auth', updateProfile);
app.use('/api/v1/auth', PasswordReset);
app.use('/api/v1/auth', passwordUpdate);
app.use('/api/v1', addStoryRoute);
app.use('/api/v1', readStoryRoute);
app.use('/api/v1', allStoriesRoute);
app.use('/api/v1', deleteStoryRoute);
app.use('/api/v1', updateStoryRoute);

app.listen(3000);
