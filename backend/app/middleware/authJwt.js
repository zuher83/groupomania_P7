const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models/index');
const User = db.users;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({
      message: 'Accès non authorisé! Veuillez vous connecter!'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(511).json({
          message: 'Session expiré!'
        });
      } else {
        res.status(401).json({
          message: 'Non autorisé!'
        });
      }
    }
    if (decoded !== undefined) {
      req.userId = decoded.id;
    }
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).json({
        message: 'Require Admin Role!'
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }
      }

      res.status(403).json({
        message: 'Require Moderator Role!'
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator_admin') {
          next();
          return;
        }

        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).json({
        message: 'Le rôle Modérateur ou Admin est requis!'
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
