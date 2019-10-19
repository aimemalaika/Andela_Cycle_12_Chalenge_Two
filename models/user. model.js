const User = {
    First_Name: {
      type: 'text',
      required: true,
      minLenght: 3,
      maxLenght: 10,
    },
    Last_Name: {
      type: 'text',
      required: true,
      minLenght: 3,
      maxLenght: 10,
    },
    Email: {
      type: 'email',
      required: true,
      minLenght: 10,
      maxLenght: 255,
    },
    Password: {
      type: 'password',
      required: true,
      minLenght: 6,
      maxLenght: 50,
      matches: true,
    },
  };
  
  module.exports = User;