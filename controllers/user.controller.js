import userModule from '../models/user. model';
import Validate from '../helpers/validation.helper';

exports.getLoginAuth = (req, res, next) => {
  res.json();
  next();
};

exports.getRegisterAuth = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const passed = validation.check(userModule.UserRegitration, values);
  console.log(validation.check(userModule.UserRegitration, values));
  if (passed === true) {
    // console.log(values);
    res.status(200).json({
      message: values,
    });
  } else {
    res.status(404).json({
      message: passed,
    });
  }
  next();
};
