const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
const db = require('../models/index');
const Post = db.posts;
const Like = db.likes;
const User = db.users;
const Comment = db.comments;

// require('dotenv').config();

exports.createPost = async (req, res, next) => {
  let userId;
  let image = null;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  if (req.file) {
    if (req.file.fieldname === 'image') {
      image = req.file.filename;
    }
  }

  try {
    const response = await Post.create({
      author: userId.get('user_id'),
      title: req.body.title,
      content: req.body.content,
      post_created: new Date().getTime(),
      image: image
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.allPosts = async (req, res, next) => {
  try {
    const allPostsDb = await Post.findAll({
      attributes: ['post_id'],
      raw: true
    });

    Promise.all(allPostsDb).then((values) => {
      res.status(200).json(values);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.onePost = async (req, res, next) => {
  try {
    const PostsDb = await Post.findByPk(req.params.id, { raw: true });
    if (PostsDb.image) {
      const imageUrl = process.env.BACKEND_URL + '/images/' + PostsDb.image;
      PostsDb.image = imageUrl;
    }
    res.status(200).json(PostsDb);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err });
  }
};

exports.myPosts = async (req, res, next) => {
  let userId;
  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }

  try {
    const allPostsDb = await Post.findAll({
      attributes: ['post_id'],
      where: { author: userId.user_id },
      raw: true
    });

    Promise.all(allPostsDb).then((values) => {
      let result = values;

      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updatePost = async (req, res, next) => {
  console.log(req);
};

exports.deletePost = async (req, res, next) => {
  try {
    await Like.destroy({
      where: { postId: req.params.id }
    });
    res.status(200).json({ message: 'Post supprimé avec succés' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.allComments = async (req, res, next) => {
  try {
    const commentsGet = await Comment.findAll({
      where: { post_id: req.params.id },
      attributes: ['comment_id'],
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
