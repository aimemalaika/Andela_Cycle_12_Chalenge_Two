exports.UserRegitration = {
  first_name: {
    type: 'text',
    required: true,
    minLenght: 3,
    maxLenght: 10,
  },
  last_name: {
    type: 'text',
    required: true,
    minLenght: 3,
    maxLenght: 10,
  },
  email: {
    type: 'email',
    required: true,
    minLenght: 10,
    maxLenght: 255,
    unique: true,
  },
  password: {
    type: 'password',
    required: true,
    minLenght: 6,
    maxLenght: 50,
    matches: true,
  },
};

exports.UserLogin = {
  email: {
    type: 'email',
    required: true,
  },
  password: {
    required: true,
    type: 'password',
  },
};
exports.UserProfileUpdate = {
  id: {
    type: 'number',
    required: true,
  },
  first_name: {
    type: 'text',
    required: true,
    minLenght: 3,
    maxLenght: 10,
  },
  last_name: {
    type: 'text',
    required: true,
    minLenght: 3,
    maxLenght: 10,
  },
  email: {
    type: 'email',
    required: true,
    minLenght: 10,
    maxLenght: 255,
    uniqueupdate: true,
  },
};

exports.resetPassword = {
  email: {
    type: 'email',
    required: true,
    minLenght: 10,
    maxLenght: 255,
  },
};

exports.userPasswordUpdate = {
  id: {
    type: 'number',
    required: true,
  },
  password: {
    type: 'password',
    required: true,
    minLenght: 6,
    maxLenght: 50,
    matches: true,
  },
};
