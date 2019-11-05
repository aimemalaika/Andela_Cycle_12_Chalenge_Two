import localStorage from 'localStorage';

import config from '../services/config';
import queries from '../services/queries';

exports.addStory = async (req, res) => {
  const { subject, content } = req.body;
  const isTitleExist = await config.executeQuery(queries.entries.getDiplicateTitle, [subject]);
  try {
    if (isTitleExist.rowCount > 0) {
      return res.status(409).json({ status: 409, error: "topic already used" });
    }
    const resultdb = await config.executeQuery(queries.entries.insertEntry, [subject, content, req.id]);
    res.status(201).json({
      status: 201,
      message: "entry successfully created",
      data: resultdb.rows[0],
    });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
  return true;
};


exports.getOneStory = (req, res) => {
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
};

exports.getAllStories = (req, res) => {
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
};

exports.deleteStory = (req, res) => {
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
};

exports.updateStory = (req, res) => {
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
          res.status(200).json({
            status: 200,
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
};
