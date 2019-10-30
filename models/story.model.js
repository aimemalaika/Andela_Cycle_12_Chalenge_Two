exports.StoryCreation = {
  subject: {
    required: true,
    minLenght: 10,
    maxLenght: 100,
    unique: true,
  },
  content: {
    required: true,
    minLenght: 20,
    maxLenght: 1000,
  },
};

exports.StoryUpdate = {
  subject: {
    required: true,
    minLenght: 10,
    maxLenght: 100,
    uniqueupdate: true,
  },
  content: {
    required: true,
    minLenght: 20,
    maxLenght: 1000,
  },
};
