import userModule from '../models/userModel';
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
exports.validateRegistration = (req, res, next) => {
  validatefx(userModule.UserRegitration, req.body, next, res);
};

exports.validateLogin = (req, res, next) => {
  validatefx(userModule.UserLogin, req.body, next, res);
};

exports.validateEmail = (req, res, next) => {
  validatefx(userModule.userPasswordUpdate, req.body, next, res);
};

exports.validateProfile = (req, res, next) => {
  validatefx(userModule.UserProfileUpdate, req.body, next, res);
};

exports.validateReset = (req, res, next) => {
  validatefx(userModule.resetPassword, req.body, next, res);
};
