/* eslint-disable radix */
import localStorage from 'localStorage';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


import userModule from '../models/user. model';
import Validate from '../helpers/validation.helper';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mydiay.reply@gmail.com',
    pass: 'Aime1995',
  },
});
exports.getLoginAuth = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.UserLogin, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length > 0) {
      const found = usersRecord.find((userdata) => userdata.Email === values.Email);
      if (typeof (found) !== 'undefined') {
        if (bcrypt.compareSync(values.Password, found.Password)) {
          res.status(200).json({
            message: found,
          });
        } else {
          res.status(200).json({
            message: 'user password incorrect',
          });
        }
      } else {
        res.status(200).json({
          message: 'user not found in array',
        });
      }
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
  next();
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
      status: 201,
      message: 'User created successfully',
      data: {
        id: idUser,
        First_Name: values.First_Name,
        Last_Name: values.Last_Name,
        Email: values.Email,
        Password: hash,
      },
    });
    localStorage.setItem('users', JSON.stringify(usersRecord));
    res.status(200).json({
      message: localStorage.getItem('users'),
    });
  } else {
    res.status(404).json({
      status: 401,
      message: passed,
    });
  }
  next();
};

exports.updateUser = (req, res, next) => {
  const { userId } = req.params;
  const validation = new Validate();
  const values = req.body;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.UserProfileUpdate, values, usersRecord);
  if (usersRecord.length > 0) {
    if (passed === true) {
      const found = usersRecord.find((userdata) => userdata.id === parseInt(userId));
      if (typeof (found) !== 'undefined') {
        const key = usersRecord.indexOf(found);
        usersRecord[key].First_Name = values.First_Name;
        usersRecord[key].Last_Name = values.Last_Name;
        usersRecord[key].Email = values.Email;
        localStorage.setItem('users', JSON.stringify(usersRecord));
        res.status(200).json({
          message: usersRecord[key],
        });
      } else {
        res.status(200).json({
          message: 'userId not found',
        });
      }
    } else {
      res.status(404).json({
        message: passed,
      });
    }
  } else {
    res.status(404).json({
      message: 'user not found',
    });
  }
  next();
};

exports.recoverPassword = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.resetPassword, values, usersRecord);
  const makepassword = (length) => {
    let result = '';
    const characters = 'ABCDabcd1234';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  if (passed === true) {
    if (usersRecord.length > 0) {
      const found = usersRecord.find((userdata) => userdata.Email === values.Email);
      if (typeof (found) !== 'undefined') {
        const password = makepassword(20);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(String(password), salt);
        const mailOptions = {
          from: 'mydiay.reply@gmail.com',
          to: values.Email,
          subject: 'MyDiary Password reset',
          html: `<div style="background-color: lightblue;color: black;padding: 40px;color: white;"><h1>MyDiary</h1><p> bellow is our new password use it to login and change your password in your account profile</p><p>Passowrd: <input style="border: none;background: #fff;padding: 5px 20px;font-size: 14px;width: 200px;font-weight: 500;color: burlywood;" type="text" value="${password}"/></p></div>`,
        };
        const key = usersRecord.indexOf(found);
        usersRecord[key].Password = hash;
        localStorage.setItem('users', JSON.stringify(usersRecord));
        try {
          transporter.sendMail(mailOptions);
          res.status(200).json({
            message: 'mail sent',
          });
        } catch (error) {
          res.status(200).json({
            message: 'user found',
          });
        }
      } else {
        res.status(200).json({
          message: 'Email not found',
        });
      }
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
  next();
};

exports.updatePassword = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.userPasswordUpdate, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length > 0) {
      const found = usersRecord.find((userdata) => userdata.id === values.id);
      if (typeof (found) !== 'undefined') {
        const password = values.Password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(String(password), salt);
        const key = usersRecord.indexOf(found);
        usersRecord[key].Password = hash;
        localStorage.setItem('users', JSON.stringify(usersRecord));
        try {
          res.status(200).json({
            message: 'Updated',
          });
        } catch (error) {
          res.status(200).json({
            message: 'user found',
          });
        }
      } else {
        res.status(200).json({
          message: 'user not found',
        });
      }
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
  next();
};
