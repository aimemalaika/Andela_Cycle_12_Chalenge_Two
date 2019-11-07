import localStorage from 'localStorage';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import config from '../services/config';
import queries from '../services/queries';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mydiay.reply@gmail.com',
    pass: 'Aime1995',
  },
});
exports.getLoginAuth = async (req, res) => {
  try {
    const isUserExists = await config.executeQuery(queries.users.isUserExist, [req.body.email]);
    if (isUserExists.rowCount === 0) {
      return res.status(400).json({ status: 400, error: "invalid email address" });
    }
    const data = isUserExists.rows[0];
    if (bcrypt.compareSync(req.body.password, data.password)) {
      const token = jwt.sign({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        id: data.id,
      }, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE', { expiresIn: '24d' });
      res.status(200).json({ status: 200, message: "User is succefully logged in", data: token });
    } else {
      res.status(401).json({
        status: 401,
        message: 'user password incorrect',
      });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, error: err.message });
  }
  return true;
};

exports.getRegisterAuth = async (req, res) => {
  try {
    const isUserExists = await config.executeQuery(queries.users.isUserExist, [req.body.email]);
    if (isUserExists.rowCount > 0) {
      return res.status(409).json({ status: 409, error: "user already exist in the system" });
    }
    const {
      first_name, last_name, email,
    } = req.body;

    const hash = bcrypt.hashSync(req.body.password, 10);
    const resultdb = await config.executeQuery(queries.users.insertUser, [first_name, last_name, email, hash]);
    const { password, ...data } = resultdb.rows[0];
    const token = jwt.sign({
      first_name,
      last_name,
      email,
      id: data.id,
    }, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE', { expiresIn: '24d' });
    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      token,
    });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const isUserExists = await config.executeQuery(queries.users.userById, [req.id]);
    if (isUserExists.rowCount === 0) {
      return res.status(404).json({ status: 404, error: "account not found" });
    }
    const {
      first_name, last_name, email,
    } = req.body;
    const nodiplicate = await config.executeQuery(queries.users.isUserExist, [req.body.email]);
    const data = nodiplicate.rows[0];
    if (data.id !== req.id) {
      return res.status(409).json({ status: 409, error: "this email already exist" });
    }
    await config.executeQuery(queries.users.updateUser, [first_name, last_name, email, req.id]);
    return res.status(200).json({
      status: 200,
      message: 'Profile updated',
    });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err.message });
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const isUserExists = await config.executeQuery(queries.users.isUserExist, [req.body.email]);
    if (isUserExists.rowCount === 0) {
      return res.status(400).json({ status: 400, error: "invalid email address" });
    }
    const makepassword = (length) => {
      let result = '';
      const characters = 'ABCDabcd1234';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };
    const password = makepassword(20);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(String(password), salt);
    const mailOptions = {
      from: 'mydiay.reply@gmail.com',
      to: req.body.email,
      subject: 'MyDiary Password reset',
      html: `<div style="background-color: lightblue;color: black;padding: 40px;color: white;"><h1>MyDiary</h1><p> bellow is our new password use it to login and change your password in your account profile</p><p>Passowrd: <input style="border: none;background: #fff;padding: 5px 20px;font-size: 14px;width: 200px;font-weight: 500;color: burlywood;" type="text" value="${password}"/></p></div>`,
    };
    await config.executeQuery(queries.users.updatePassword, [hash, isUserExists.rows[0].id]);
    transporter.sendMail(mailOptions);
    return res.status(200).json({
      status: 200,
      message: 'Password Updated check email',
    });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const isUserExists = await config.executeQuery(queries.users.userById, [req.id]);
    if (isUserExists.rowCount === 0) {
      return res.status(404).json({ status: 404, error: "account not found" });
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    await config.executeQuery(queries.users.updatePassword, [hash, req.id]);
    return res.status(200).json({
      status: 200,
      message: 'Password Updated',
    });
  } catch (err) {
    return res.status(500).json({ status: 500, error: err.message });
  }
};
