import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const user1token = jwt.sign({
  id: 1,
  first_name: 'aime',
  last_name: 'malaika',
  email: 'aimemalaika1995@gmail.com',
}, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');

const user2token = jwt.sign({
  id: 2,
  first_name: 'aime',
  last_name: 'malaika',
  email: 'aimemalaika1995@gmail.com',
}, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');
const user3token = jwt.sign({
  id: 4,
  first_name: 'aime',
  last_name: 'malaika',
  email: 'aimemalaika1995@gmail.com',
}, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE');
const user1 = {
  first_name: 'aime',
  last_name: 'malaika',
  email: 'aimemalaika@gmail.com',
  password: 'Aime1995',
};

const signupUser = {
  first_name: 'aime',
  last_name: 'malaika',
  email: 'aimemalaika1995@gmail.com',
  password: 'Aime1995',
  cpassword: 'Aime1995',
};

const requiredinfo = {
  first_name: '',
  last_name: '',
  email: 'aimemala',
  password: 'Aime1995',
  cpassword: 'Aime1995',
};

const validatetex = {
  first_name: '3123131',
  last_name: '321313123',
  email: 'aimemala@fdsfds.dsf',
  password: 'Aime1995',
  cpassword: 'Aime1995',
};

const lengthrequired = {
  first_name: 'oksdcsdcoewrewrewrewrewrwe',
  last_name: 'p',
  email: 'aimemala@fdsfds.dsf',
  password: 'Aime1995',
  cpassword: 'Aime1995',
};

const passworddontmatch = {
  first_name: 'jhhggjh',
  last_name: 'cesar',
  email: 'aimemalaika1995@gmail.com',
  password: 'Aime1995',
  cpassword: 'yewryewiru',
};


const noemailsignup = {
  first_name: 'jhhggjh',
  last_name: 'cesar',
  password: 'Aime1995',
  cpassword: 'Aime1995',
};

const loginuser = {
  email: 'aimemalaika1995@gmail.com',
  password: 'Aime1995',
};

const unregistreduser = {
  email: 'aimemalaika1995congo@gmail.com',
  password: 'Aime1995',
};

const badpassword = {
  first_name: 'jhhggjh',
  last_name: 'cesar',
  email: 'aimemalaika1995@gmail.com',
  password: 'aime1995',
  cpassword: 'aime1995',
};

const updatePassword = {
  password: 'Aime1995',
  cpassword: 'Aime1995',
};
const incorrectpassword = {
  email: 'aimemalaika1995@gmail.com',
  password: 'Aime1995q',
};

const userUpdateprofile = {
  first_name: "malalaika",
  last_name: "malaika",
  email: "aimemalaika1995@gmail.com",
};

const resetemail = {
  email: 'aimemalaika1995@gmail.com',
};

const invalidToken = 'iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoid2lsbH';

export default {
  user1token, user2token, user3token, user1, resetemail, userUpdateprofile, invalidToken, signupUser, requiredinfo, validatetex, lengthrequired, noemailsignup, loginuser, badpassword, passworddontmatch, unregistreduser, incorrectpassword, updatePassword,
};
