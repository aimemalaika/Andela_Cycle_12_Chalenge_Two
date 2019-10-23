exports.StoryCreation = {
  Subject: {
    required: true,
    minLenght: 10,
    maxLenght: 100,
    unique: true,
  },
  Content: {
    required: true,
    minLenght: 20,
    maxLenght: 1000,
  },
  Auther: {
    type: 'number',
    required: true,
  },
};

exports.StoryUpdate = {
  Subject: {
    required: true,
    minLenght: 10,
    maxLenght: 100,
    unique: true,
  },
  Content: {
    required: true,
    minLenght: 20,
    maxLenght: 1000,
  },
};
