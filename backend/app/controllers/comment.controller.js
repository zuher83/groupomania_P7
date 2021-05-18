const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = db.users;
const Comment = db.comments;

exports.allComments = async (req, res, next) => {
  try {
    const commentsGet = await Comment.findAll({
      where: { post_id: req.params.id },
      attributes: ['comment_id', 'post_id'],
      raw: true
    });

    Promise.all(commentsGet).then((values) => {
      let result = values;
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.countComments = async (req, res, next) => {
  try {
    const commentsCount = await Comment.count({
      where: { post_id: req.params.id },
      raw: true
    });

    res.status(200).json(commentsCount);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.oneComment = async (req, res, next) => {
  try {
    const Result = await Comment.findByPk(req.params.id, { raw: true });
    res.status(200).json(Result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.createComments = async (req, res, next) => {
  let userId;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  try {
    const response = await Comment.create({
      post_id: req.body.post_id,
      comment: req.body.comment,
      user_id: userId.user_id,
      create_date: new Date().getTime()
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
