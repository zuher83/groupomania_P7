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
  let user_id = req.params.id;
  if (req) {
    // const token = req.headers['x-access-token'];
    // const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(user_id);
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
    const result = await Post.destroy({
      where: { post_id: req.params.id }
    });
    console.log(result);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
