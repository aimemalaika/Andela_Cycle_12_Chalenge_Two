/* eslint-disable radix */
import localStorage from 'localStorage';


import storymodule from '../models/story.model';
import Validate from '../helpers/validation.helper';

exports.addStory = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  const storyrecord = JSON.parse(localStorage.getItem('stories')) || [];
  const passed = validation.check(storymodule.Story, values);
  let postId;
  if (passed === true) {
    if (storyrecord.length === 0) {
      postId = 1;
    } else {
      const maxId = (array, prop) => {
        let max;
        for (let i = 0; i < array.length; i += 1) {
          if (!max || parseInt(array[i][prop]) > parseInt(max[prop])) { max = array[i]; }
        }
        return max.id + 1;
      };

      postId = maxId(storyrecord, 'id');
    }
    storyrecord.push({
      id: postId,
      Title: values.Title,
      Content: values.Content,
      Auther: values.Auther,
    });
    localStorage.setItem('stories', JSON.stringify(storyrecord));
    res.status(200).json({
      message: storyrecord,
    });
  }
  next();
};


exports.getOneStory = (req, res, next) => {
  const { storyId } = req.params;
  const storyrecord = JSON.parse(localStorage.getItem('stories')) || [];
  if (storyrecord.length > 0) {
    storyrecord.map((story) => {
      if (story.id === parseInt(storyId)) {
        res.status(200).json({
          message: story,
          
        });
      } else {
        res.status(200).json({
          message: storyrecord,
        });
      }
      return true;
    });
  } else {
    res.status(200).json({
      message: 'story not found',
    });
  }
  next();
};
