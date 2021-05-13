const { authJwt } = require('../middleware');
const controller = require('../controllers/post.controller');
const multer = require('../middleware/multer');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/posts-all', [authJwt.verifyToken], controller.allPosts);
  app.get('/api/posts-get/:id', [authJwt.verifyToken], controller.onePost);
  app.get('/api/posts-my', [authJwt.verifyToken], controller.myPosts);
  app.post(
    '/api/posts-create',
    [authJwt.verifyToken],
    multer,
    controller.createPost
  );
  app.put('/api/posts-update', [authJwt.verifyToken], controller.updatePost);
  app.delete(
    '/api/posts-delete/:id',
    [authJwt.verifyToken],
    controller.deletePost
  );

  // Comments
  app.get('/api/comments-all/:id', [authJwt.verifyToken], controller.allComments);
  app.get('/api/comments/:id', [authJwt.verifyToken], controller.oneComment);
  app.post(
    '/api/comments-create',
    [authJwt.verifyToken],
    controller.createComments
  );

  // Likes routes
  app.get('/api/posts-likes/:id', [authJwt.verifyToken], controller.getLikes);
  app.post('/api/posts-likes', [authJwt.verifyToken], controller.postLike);
  app.delete(
    '/api/posts-likes/:id',
    [authJwt.verifyToken],
    controller.postUnLike
  );
};
