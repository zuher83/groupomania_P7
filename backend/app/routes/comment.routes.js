const { authJwt } = require('../middleware');
const commentController = require('../controllers/comment.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Comments
  app.get(
    '/api/comments-count/:id',
    [authJwt.verifyToken],
    commentController.countComments
  );
  app.get(
    '/api/comments-all/:id',
    [authJwt.verifyToken],
    commentController.allComments
  );
  app.get(
    '/api/comments/:id',
    [authJwt.verifyToken],
    commentController.oneComment
  );
  app.post(
    '/api/comments-create',
    [authJwt.verifyToken],
    commentController.createComments
  );
};
