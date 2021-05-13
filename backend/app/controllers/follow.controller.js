const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');

const db = require('../models/index');
const Follow = db.follow_user;
const User = db.users;

exports.FollowUnfollowAllGet = async (req, res, next) => {
  let userId;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  try {
    const followUnfollow = await Follow.findAll({
      where: { follower_id: userId },
      raw: true
    });

    Promise.all(followUnfollow).then((values) => {
      return res.status(200).json(values);
    });
  } catch (err) {
    next(err);
  }
};

exports.FollowUnfollowGet = async (req, res, next) => {
  let followed;
  const userId = req.params.id;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    followed = await User.findByPk(decoded.id);
  } else {
    followed = null;
  }

  try {
    const followUnfollow = await Follow.findAll({
      where: { user_id: userId, follower_id: followed },
      raw: true
    });

    Promise.all(followUnfollow).then((values) => {
      const result = { userFallow: 0 };
      values.map((usr) => {
        if (usr.follower_id === followed.user_id) {
          result['userFallow'] = 1;
        } else {
          result['userFallow'] = 0;
        }
      });
      return res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};

exports.followUnfollowPost = async (req, res, next) => {
  const userId = req.body.user;
  let follower_id;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    follower_id = await User.findByPk(decoded.id);
  } else {
    follower_id = null;
  }

  try {
    const followerCheck = await Like.findAll({
      where: { folllower_id: follower_id, user_id: userId },
      raw: true
    });

    Promise.all(followerCheck).then((values) => {
      Like.create({
        follower_id: follower_id.user_id,
        user_id: userId,
      });
      let result = 1;
      return res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};

exports.followUnfollowDelete = async (req, res, next) => {
  let follower_id;
  userId = req.params.id;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    follower_id = await User.findByPk(decoded.id);
  } else {
    follower_id = null;
  }

  try {
    const followerCheck = await Like.findAll({
      where: { user_id: userId, follower_id: follower_id },
      raw: true
    });

    Promise.all(followerCheck).then((values) => {
      values.map((usr) => {
        if (usr.like_by === userId.user_id) {
          Like.destroy({
            where: { like_id: usr.like_id, like_by: userId.user_id }
          });
        }
      });
      const result = 0;
      return res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};
