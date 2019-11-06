import storyModule from '../models/storyModel';
import Validate from '../helpers/validationHelper';

exports.addingEntry = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const passed = validation.check(storyModule.StoryCreation, values);
  if (passed === true) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};

exports.updateEntrie = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const passed = validation.check(storyModule.updateEntrie, values);
  if (passed === true) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};
