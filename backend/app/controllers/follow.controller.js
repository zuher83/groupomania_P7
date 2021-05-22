const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');

const db = require('../models/index');
const Follow = db.follow_user;
const User = db.users;

exports.FollowUnfollowAllGet = async (req, res, next) => {
  let userId = req.params.id;

  try {
    const followUnfollow = await User.findAll({
      include: [
        {
          model: Follow,
          as: 'follow_users',
          where: { follower_id: userId }
        }
      ],
      raw: true,
    });

    Promise.all(followUnfollow).then((values) => {
      values.map((value) => {
        if (value.image) {
          value.image = process.env.BACKEND_URL + '/images/' + value.image;
        }
        if (value.image_cover) {
          value.image_cover = process.env.BACKEND_URL + '/images/' + value.image_cover;
        }
      })
      res.status(200).json(values);
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
      where: { user_id: userId, follower_id: followed.user_id },
      raw: true
    });

    Promise.all(followUnfollow).then((values) => {
      const result = { userFollow: 0 };
      values.map((usr) => {
        if (usr.follower_id === followed.user_id) {
          result['userFollow'] = 1;
        } else {
          result['userFollow'] = 0;
        }
      });
      res.status(200).json(result);
    });
  } catch (err) {
    next(err);
  }
};


exports.followUnfollowPost = async (req, res, next) => {
  console.log(req.body);
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
    const followerCheck = await Follow.findAll({
      where: { follower_id: follower_id.user_id, user_id: userId },
      raw: true
    });

    Promise.all(followerCheck).then((values) => {
      Follow.create({
        follower_id: follower_id.user_id,
        user_id: userId
      });
      const result = 1;
      res.status(200).json(result);
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
    Follow.destroy({
      where: { user_id: userId, follower_id: follower_id.user_id }
    });
    const result = 0;
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
