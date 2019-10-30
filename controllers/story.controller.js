/* eslint-disable radix */
import localStorage from 'localStorage';

import storyModule from '../models/story.model';
import Validate from '../helpers/validation.helper';

const today = `${new Date().getDay()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`;
exports.addStory = (req, res, next) => {
  const validation = new Validate();
  const values = req.body;
  let storyId;
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  const passed = validation.check(storyModule.StoryCreation, values, storyRecord);
  if (passed === true) {
    if (storyRecord.length === 0) {
      storyId = 1;
    } else {
      const maxId = (array, prop) => {
        let max;
        for (let i = 0; i < array.length; i += 1) {
          if (!max || parseInt(array[i][prop]) > parseInt(max[prop])) { max = array[i]; }
        }
        return max.id + 1;
      };

      storyId = maxId(storyRecord, 'id');
    }
    storyRecord.push({
      id: storyId,
      Subject: values.Subject,
      Content: values.Content,
      Auther: req.id,
      createdOn: today,
    });
    localStorage.setItem('stories', JSON.stringify(storyRecord));
    res.status(201).json({
      status: 201,
      data: {
        id: storyRecord.id,
        message: 'entry successfully created',
        Subject: values.Subject,
        Content: values.Content,
        Auther: req.id,
        createdOn: today,
      },
    });
  } else {
    res.status(401).json({
      status: 401,
      message: passed,
    });
  }
  // next();
};


exports.getOneStory = (req, res, next) => {
  const { storyId } = req.params;
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  if (storyRecord.length > 0) {
    const found = storyRecord.find((storydata) => storydata.id === parseInt(storyId));
    if (typeof (found) !== 'undefined') {
      res.status(200).json({
        status: 200,
        data: {
          found,
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        message: 'storyId not found',
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'story not found',
    });
  }
  // next();
};

exports.getAllStories = (req, res, next) => {
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  const auther = req.id;
  if (storyRecord.length > 0) {
    const found = storyRecord.find((storydata) => storydata.Auther === parseInt(auther));
    if (typeof (found) !== 'undefined') {
      res.status(200).json({
        status: 200,
        data: { found },
      });
    } else {
      res.status(401).json({
        status: 401,
        message: 'story not posted yet',
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'story not found',
    });
  }
  // next();
};

exports.deleteStory = (req, res, next) => {
  const { storyId } = req.params;
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  if (storyRecord.length > 0) {
    const found = storyRecord.find((storydata) => storydata.id === parseInt(storyId));
    if (typeof (found) !== 'undefined') {
      const key = storyRecord.indexOf(found);
      delete storyRecord[key];
      const data = storyRecord.filter((x) => x !== null);
      localStorage.setItem('stories', JSON.stringify(data));
      res.status(204).json({
        status: 204,
        data: {
          message: 'entry successfully deleted',
          data,
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        message: 'storyId not found',
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'story not found',
    });
  }
  // next();
};

exports.updateStory = (req, res, next) => {
  const { storyId } = req.params;
  const validation = new Validate();
  const values = req.body;
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  const passed = validation.check(storyModule.StoryUpdate, values, storyRecord);
  if (passed === true) {
    if (storyRecord.length > 0) {
      const found = storyRecord.find((storydata) => storydata.id === parseInt(storyId));
      if (typeof (found) !== 'undefined') {
        const key = storyRecord.indexOf(found);
        storyRecord[key].Subject = values.Subject;
        storyRecord[key].Content = values.Content;
        localStorage.setItem('stories', JSON.stringify(storyRecord));
        res.status(200).json({
          status: 201,
          data: {
            message: 'entry successfully edited”',
            storyRecord,
          },
        });
      } else {
        res.status(401).json({
          status: 401,
          message: 'storyId not found',
        });
      }
    } else {
      res.status(401).json({
        status: 401,
        message: 'story not found',
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: passed,
    });
  }
  // next();
};
