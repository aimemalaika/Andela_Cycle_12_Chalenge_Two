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
    return res.status(201).json({
      status: 201,
      message: "entry successfully created",
      data: resultdb.rows[0],
    });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
};


exports.getOneStory = async (req, res) => {
  const isPostExist = await config.executeQuery(queries.entries.getOneStory, [req.id, req.params.storyId]);
  try {
    if (isPostExist.rowCount === 0) {
      return res.status(409).json({ status: 409, error: "no topic found" });
    }
    return res.status(200).json({
      status: 200,
      data: isPostExist.rows[0],
    });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
};

exports.getAllStories = async (req, res) => {
  const isPostExist = await config.executeQuery(queries.entries.getAllStories, [req.id]);
  try {
    if (isPostExist.rowCount === 0) {
      return res.status(409).json({ status: 409, error: "no topic found" });
    }
    return res.status(200).json({
      status: 200,
      data: isPostExist.rows,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
};

exports.deleteStory = async (req, res) => {
  const isPostExist = await config.executeQuery(queries.entries.getOneStory, [req.id, req.params.storyId]);
  try {
    if (isPostExist.rowCount === 0) {
      return res.status(409).json({ status: 409, error: "no topic found" });
    }
    const { id } = isPostExist.rows[0];
    await config.executeQuery(queries.entries.deleteStory, [id]);
    return res.status(204).json({
      status: 204,
      message: 'entry deleted succesfully',
    });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
};

exports.updateStory = async (req, res) => {
  const isPostExist = await config.executeQuery(queries.entries.getOneStory, [req.id, req.params.storyId]);
  try {
    if (isPostExist.rowCount === 0) {
      return res.status(409).json({ status: 409, error: "no topic found" });
    }
    const postId = isPostExist.rows[0].id;
    const { subject, content } = req.body;
    await config.executeQuery(queries.entries.updateStory, [subject, content, req.id, postId]);
    return res.status(200).json({
      status: 200,
      message: 'entry updated successfully',
      data: req.body,
    });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  }
};
