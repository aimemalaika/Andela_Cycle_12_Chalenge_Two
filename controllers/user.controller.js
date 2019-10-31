/* eslint-disable radix */
import localStorage from 'localStorage';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';


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
      const found = usersRecord.find((userdata) => userdata.email === values.email);
      if (typeof (found) !== 'undefined') {
        if (bcrypt.compareSync(values.password, found.password)) {
          const tokenapi = jwt.sign({
            first_name: found.first_name,
            last_name: found.last_name,
            email: found.email,
            id: found.id,
          }, process.env.TOKEN_KEY, { expiresIn: '4h' });
          res.status(201).json({
            status: 201,
            message: 'user logged in',
            data: {
              token: tokenapi,
              id: found.id,
              first_name: found.first_name,
              last_name: found.last_name,
              email: found.email,
            },
          });
        } else {
          res.status(400).json({
            status: 400,
            message: 'user password incorrect',
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'user not found in array',
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: 'user not found',
      });
    }
  } else {
    res.status(400).json({
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
    const hash = bcrypt.hashSync(values.password, salt);
    usersRecord.push({
      id: idUser,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: hash,
    });
    localStorage.setItem('users', JSON.stringify(usersRecord));
    const tokenapi = jwt.sign({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      id: idUser,
    }, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE', { expiresIn: '4h' });
    res.status(200).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token: tokenapi,
        id: idUser,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      },
    });
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};

exports.updateUser = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  req.body.id = req.id;
  const idUser = req.id;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.UserProfileUpdate, values, usersRecord, idUser);
  if (usersRecord.length > 0) {
    if (passed === true) {
      const found = usersRecord.find((userdata) => userdata.id === parseInt(idUser));
      if (typeof (found) !== 'undefined') {
        const key = usersRecord.indexOf(found);
        usersRecord[key].first_name = values.first_name;
        usersRecord[key].last_name = values.last_name;
        usersRecord[key].Email = values.Email;
        localStorage.setItem('users', JSON.stringify(usersRecord));
        res.status(201).json({
          status: 201,
          message: 'User updated successfully',
          data: {
            id: usersRecord[key].id,
            first_name: usersRecord[key].first_name,
            last_name: usersRecord[key].last_name,
            email: usersRecord[key].email,
          },
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'userId not found',
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: passed,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: 'user not found',
    });
  }
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
      const found = usersRecord.find((userdata) => userdata.email === values.email);
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
        usersRecord[key].password = hash;
        localStorage.setItem('users', JSON.stringify(usersRecord));
        try {
          transporter.sendMail(mailOptions);
          res.status(201).json({
            status: 201,
            message: 'email sent successful',
          });
        } catch (error) {
          res.status(400).json({
            status: 400,
            message: 'fail to send email',
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: 'Email not found',
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: 'user not found',
      });
    }
  } else {
    res.status(400).json({
      message: passed,
    });
  }
};

exports.updatePassword = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  req.body.id = req.id;
  const userId = req.id;
  const usersRecord = JSON.parse(localStorage.getItem('users')) || [];
  const passed = validation.check(userModule.userPasswordUpdate, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length > 0) {
      const found = usersRecord.find((userdata) => userdata.id === parseInt(userId));
      if (typeof (found) !== 'undefined') {
        const passwords = values.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(String(passwords), salt);
        const key = usersRecord.indexOf(found);
        usersRecord[key].password = hash;
        localStorage.setItem('users', JSON.stringify(usersRecord));
        res.status(201).json({
          status: 201,
          message: 'Password Updated',
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'userId not found',
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: 'user not found',
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
};
