const { authJwt } = require('../middleware');
const controller = require('../controllers/follow.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  // Follow routes
  app.get('/api/followed/:id', [authJwt.verifyToken], controller.FollowUnfollowAllGet);
  app.get('/api/follow/:id', [authJwt.verifyToken], controller.FollowUnfollowGet);
  app.post('/api/follow', [authJwt.verifyToken], controller.followUnfollowPost);
  app.delete('/api/follow/:id', [authJwt.verifyToken], controller.followUnfollowDelete);
};
