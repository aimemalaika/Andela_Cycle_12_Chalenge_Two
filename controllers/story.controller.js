import storymodule from '../models/story.model';

exports.addStory = (req, res, next) => {
  res.status(200).json({
    message: 'got u',
  });
  next();
};
