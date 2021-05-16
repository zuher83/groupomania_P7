const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const db = require('../models/index');
const User = db.users;
const Role = db.user_roles;

exports.allAccess = (req, res) => {
  res.status(200).json('Contenu Public.');
};

exports.homePage = (req, res) => {
  res.status(200).json('Page Accueil.');
};

exports.userBoard = (req, res) => {
  res.status(200).json('Utilisateur.');
};

exports.adminBoard = (req, res) => {
  res.status(200).json('Admin.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).json('Moderateur.');
};

exports.allUsers = async (req, res, next) => {
  let userId;
  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
  } else {
    userId = null;
  }
  allUsers = await User.findAll({
    where: {
      user_id: {
        [Sequelize.Op.not]: userId.user_id
      }
    },
    raw: true
  });
  allUsers.map((userId) => {
    if (userId.image) {
      userId.image = process.env.BACKEND_URL + '/images/' + userId.image;
    }
    if (userId.image_cover) {
      userId.image_cover =
        process.env.BACKEND_URL + '/images/' + userId.image_cover;
    }
  });
  console.log(allUsers);
  res.status(200).json(allUsers);
};

exports.myProfile = async (req, res, next) => {
  let userId;
  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
    if (userId.image) {
      userId.image = process.env.BACKEND_URL + '/images/' + userId.image;
    }
    if (userId.image_cover) {
      userId.image_cover =
        process.env.BACKEND_URL + '/images/' + userId.image_cover;
    }
    res.status(200).json(userId);
  } else {
    res.status(500).json('Utilisateur non trouvé!');
  }
};

exports.userGet = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (id) {
      currentUser = await User.findByPk(req.params.id);
      if (currentUser.image) {
        currentUser.image =
          process.env.BACKEND_URL + '/images/' + currentUser.image;
      }
      if (currentUser.image_cover) {
        currentUser.image_cover =
          process.env.BACKEND_URL + '/images/' + currentUser.image_cover;
      }
      res.status(200).json(currentUser);
    }
  } catch (err) {
    res.status(500).json('Utilisateur non trouvé!');
  }
};

exports.userUpdate = (req, res, next) => {
  const id = req.params.id;
  var datas = req.body;
  if (req.file) {
    if (req.file.fieldname === 'image') {
      var datas = {
        image: req.file.filename
      };
    }
    if (req.file.fieldname === 'image_cover') {
      var datas = {
        image_cover: req.file.filename
      };
    }
  }

  User.update(datas, {
    where: { user_id: id }
  })
    .then((user) => {
      if (user == 1) {
        res.status(200).json({
          message: 'Profil Admin mis à jour.'
        });
      } else {
        res.status(200).json({
          message: `Votre profile est mis à jour!`
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Erreur de mise à jour du profile'
      });
    });
};

exports.userDelete = async (req, res) => {
  const userId = req.params.id;
  let currentUser;
  let currentUserRole;

  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    currentUser = await User.findByPk(decoded.id);
    currentUserRole = await Role.findOne({
      where: { roleId: 3, userId: currentUser.user_id },
      raw: true
    });
  } else {
    currentUser = null;
  }

  if (userId !== currentUser.user_id || currentUserRole.roleId === 3) {
    console.log(currentUserRole);
    try {
      User.destroy({
        where: { user_id: userId }
      });
      res.status(200).json({ message: 'Profile supprimé' });
    } catch (err) {
      next(err);
    }
  }
};
