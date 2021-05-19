const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');
const multer = require('../middleware/multer');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/public', controller.allAccess);

  app.get('/api/home', [authJwt.verifyToken], controller.homePage);

  app.get('/api/users', [authJwt.verifyToken], controller.allUsers);
  app.get('/api/me', [authJwt.verifyToken], controller.myProfile);
  app.get('/api/user/:id', [authJwt.verifyToken], controller.userGet);
  app.delete('/api/user/:id', [authJwt.verifyToken], controller.userDelete);
  app.put(
    '/api/user-update/:id',
    [authJwt.verifyToken],
    multer,
    controller.userUpdate
  );

  app.get(
    '/api/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    '/api/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get('/api/role/:id', [authJwt.verifyToken], controller.checkRole);
  app.put('/api/role/:id', [authJwt.verifyToken], controller.setRole);
};
