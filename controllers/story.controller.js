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
      subject: values.subject,
      content: values.content,
      Auther: req.id,
      createdOn: today,
    });
    localStorage.setItem('stories', JSON.stringify(storyRecord));
    res.status(201).json({
      status: 201,
      message: 'entry successfully created',
      data: {
        id: storyId,
        subject: values.subject,
        content: values.content,
        Auther: req.id,
        createdOn: today,
      },
    });
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
  // next();
};


exports.getOneStory = (req, res, next) => {
  const { storyId } = req.params;
  const auther = req.id;
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  if (storyRecord.length > 0) {
    const found = storyRecord.find((storydata) => storydata.id === parseInt(storyId));
    if (typeof (found) !== 'undefined') {
      if (found.Auther === parseInt(auther)) {
        res.status(200).json({
          status: 200,
          data: {
            found,
          },
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'trying to get post that are not yours',
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: 'story not found',
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: 'story not found',
    });
  }
  // next();
};

exports.getAllStories = (req, res, next) => {
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  const auther = req.id;
  if (storyRecord.length > 0) {
    const found = storyRecord.filter((storydata) => storydata.Auther === parseInt(auther));
    if (typeof (found) !== 'undefined' && found.length > 0) {
      res.status(200).json({
        status: 200,
        data: { found },
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'story not posted yet',
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: 'story not found',
    });
  }
  // next();
};

exports.deleteStory = (req, res, next) => {
  const { storyId } = req.params;
  const auther = req.id;
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  if (storyRecord.length > 0) {
    const found = storyRecord.find((storydata) => storydata.id === parseInt(storyId));
    if (typeof (found) !== 'undefined') {
      if (found.Auther === parseInt(auther)) {
        const key = storyRecord.indexOf(found);
        delete storyRecord[key];
        const data = storyRecord.filter((x) => x !== null);
        localStorage.setItem('stories', JSON.stringify(data));
        res.status(204).json({
          status: 204,
          message: 'entry successfully deleted',
        });
      } else {
        res.status(403).json({
          status: 403,
          message: 'trying to get post that are not yours',
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: 'story not found',
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      message: 'story not found',
    });
  }
  // next();
};

exports.updateStory = (req, res, next) => {
  const { storyId } = req.params;
  const validation = new Validate();
  const values = req.body;
  req.body.id = storyId;
  const auther = req.id;
  const storyRecord = JSON.parse(localStorage.getItem('stories')) || [];
  const passed = validation.check(storyModule.StoryUpdate, values, storyRecord);
  if (passed === true) {
    if (storyRecord.length > 0) {
      const found = storyRecord.find((storydata) => storydata.id === parseInt(storyId));
      if (typeof (found) !== 'undefined') {
        if (found.Auther === parseInt(auther)) {
          const key = storyRecord.indexOf(found);
          storyRecord[key].subject = values.subject;
          storyRecord[key].content = values.content;
          localStorage.setItem('stories', JSON.stringify(storyRecord));
          res.status(201).json({
            status: 201,
            message: 'entry successfully edited',
            data: {
              subject: storyRecord[key].subject,
              content: storyRecord[key].content,
            },
          });
        } else {
          res.status(403).json({
            status: 403,
            message: 'trying to get post that are not yours',
          });
        }
      } else {
        res.status(404).json({
          status: 404,
          message: 'story not found',
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        message: 'story not found',
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: passed,
    });
  }
  // next();
};
