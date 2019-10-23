const Story = {
  Title: {
    type: 'text',
    required: true,
    minLenght: 5,
    maxLenght: 100,
  },
  Content: {
    type: 'text',
    required: true,
    minLenght: 20,
    maxLenght: 500,
  },
  Auther: {
    type: 'number',
    required: true,
  },
};

module.exports = Story;
