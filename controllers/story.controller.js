import localStorage from 'localStorage';

import storyModule from '../models/story.model';
import Validate from '../helpers/validation.helper';

exports.addStory = (req, res, next) => {
  res.satus().json({
    message: 'got u',
  });
  next();
};
