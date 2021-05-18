const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
const db = require('../models/index');
const Post = db.posts;
const Like = db.likes;
const User = db.users;
const Comment = db.comments;

exports.getLikes = async (req, res, next) => {
  let userId;
  const postId = req.params.id;
  const like = req.body;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  try {
    const likeDislike = await Like.findAll({
      where: { post_id: postId },
      raw: true
    });

    Promise.all(likeDislike).then((values) => {
      const result = { countVals: 0, userLiked: 0 };
      result['countVals'] = values.length;
      values.map((usr) => {
        if (usr.like_by === userId.user_id) {
          result['userLiked'] = 1;
        } else {
          result['userLiked'] = 0;
        }
      });
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postLike = async (req, res, next) => {
  let userId;
  let postId;
  if (req.body.post) {
    postId = req.body.post;
  }
  if (req.params.id) {
    postId = req.params.id;
  }
  const like = req.body;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  try {
    const likeDislike = await Like.findAll({
      where: { post_id: postId },
      raw: true
    });

    Promise.all(likeDislike).then((values) => {
      const result = { countVals: values.length, userLiked: 0 };

      if (values.length !== 0) {
        values.map((usr) => {
          if (usr.like_by === userId.user_id) {
            result['userLiked'] = 1;
            res.status(200).json(result);
          } else {
            Like.create({
              post_id: postId,
              like_by: userId.user_id,
              liket_time: new Date().getTime()
            });
            result['userLiked'] = 1;
            result['countVals'] = values.length + 1;
          }
        });
      } else {
        Like.create({
          post_id: postId,
          like_by: userId.user_id,
          liket_time: new Date().getTime()
        });
        result['userLiked'] = 1;
        result['countVals'] = values.length + 1;
      }

      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postUnLike = async (req, res, next) => {
  let userId;
  postId = req.params.id;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  try {
    const likeDislike = await Like.findAll({
      where: { post_id: postId },
      raw: true
    });

    Promise.all(likeDislike).then((values) => {
      const result = { countVals: values.length, userLiked: 0 };

      values.map((usr) => {
        if (usr.like_by === userId.user_id) {
          Like.destroy({
            where: { like_id: usr.like_id, like_by: userId.user_id }
          });
          result['userLiked'] = 0;
          result['countVals'] = values.length - 1;
        }
      });
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
