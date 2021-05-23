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
  let postId = req.body.post;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  const likeDislike = await Like.findAll({
    where: { post_id: postId, like_by: userId.user_id },
    raw: true
  });

  const result = { userLiked: 0 };

  if (likeDislike.length === 0) {
    await Like.create({
      post_id: postId,
      like_by: userId.user_id,
      liket_time: new Date().getTime()
    });
    result['userLiked'] = 1;
  }

  if (likeDislike.length !== 0) {
    await Like.destroy({
      where: { post_id: postId, like_by: userId.user_id }
    });
    result['userLiked'] = 0;
  }

  const likeDislikeCount = await Like.findAll({
    where: { post_id: postId },
    raw: true
  });

  result['countVals'] = likeDislikeCount.length;

  return res.status(200).json(result);
};
