import userModule from '../models/userModel';
import Validate from '../helpers/validationHelper';
exports.validateRegistration = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const passed = validation.check(userModule.UserRegitration, values);
  if (passed === true) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};

exports.validateLogin = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const passed = validation.check(userModule.UserLogin, values);
  if (passed === true) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};

exports.validateEmail = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const passed = validation.check(userModule.userPasswordUpdate, values);
  if (passed === true) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};

exports.validateProfile = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const passed = validation.check(userModule.UserProfileUpdate, values);
  if (passed === true) {
    next();
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};
