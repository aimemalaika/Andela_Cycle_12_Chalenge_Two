import storyModule from '../models/storyModel';
import Validate from '../helpers/validationHelper';

const validatefx = (keymodule, datasent, next, res) => {
  const validation = new Validate();
  const values = datasent;
  const passed = validation.check(keymodule, values);
  if (passed === true) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};
exports.addingEntry = (req, res, next) => {
  validatefx(storyModule.StoryCreation, req.body, next, res);
};

exports.updateEntrie = (req, res, next) => {
  validatefx(storyModule.updateEntrie, req.body, next, res);
};
