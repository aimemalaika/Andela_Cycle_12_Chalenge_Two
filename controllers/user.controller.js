/* eslint-disable radix */
import localStorage from 'localStorage';
import bcrypt from 'bcrypt';

import userModule from '../models/user. model';
import Validate from '../helpers/validation.helper';

exports.getLoginAuth = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.UserLogin, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length > 0) {
      usersRecord.map((user) => {
        if (user.Email === req.body.Email) {
          if (bcrypt.compareSync(values.Password, user.Password)) {
            res.status(200).json({
              message: user,
            });
          } else {
            res.status(200).json({
              message: 'user password',
            });
          }
        }
        return true;
      });
    } else {
      res.status(200).json({
        message: 'user not found',
      });
    }
  } else {
    res.status(404).json({
      message: passed,
    });
  }
};

exports.getRegisterAuth = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  let idUser;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.UserRegitration, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length === 0) {
      idUser = 1;
    } else {
      const maxId = (array, prop) => {
        let max;
        for (let i = 0; i < array.length; i += 1) {
          if (!max || parseInt(array[i][prop]) > parseInt(max[prop])) { max = array[i]; }
        }
        return max.id + 1;
      };

      idUser = maxId(usersRecord, 'id');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(values.Password, salt);
    usersRecord.push({
      id: idUser,
      First_Name: values.First_Name,
      Last_Name: values.Last_Name,
      Email: values.Email,
      Password: hash,
    });
    localStorage.setItem('users', JSON.stringify(usersRecord));
    res.status(200).json({
      message: localStorage.getItem('users'),
    });
  } else {
    res.status(404).json({
      message: passed,
    });
  }
  next();
};
