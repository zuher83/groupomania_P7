const config = require('../config/auth.config');
var jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const db = require('../models/index');
const User = db.users;

exports.allAccess = (req, res) => {
  res.status(200).send('Contenu Public.');
};

exports.homePage = (req, res) => {
  res.status(200).send('Page Accueil.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('Utilisateur.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderateur.');
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
  return res.status(200).send(allUsers);
};

exports.myProfile = async (req, res, next) => {
  let userId;
  if (req) {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, config.secret);
    userId = await User.findByPk(decoded.id);
    return res.status(200).send(userId);
  } else {
    return res.status(500).send('Utilisateur non trouvé!');
  }
};

exports.userGet = async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    currentUser = await User.findByPk(req.params.id);
    return res.status(200).send(currentUser);
  } else {
    return res.status(500).send('Utilisateur non trouvé!');
  }
};

exports.userUpdate = (req, res, next) => {
  const id = req.params.id;
  var datas = req.body;
  if (req.file) {
    if (req.file.fieldname === 'image') {
      var datas = {
        image: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`
      };
    }
    if (req.file.fieldname === 'image_cover') {
      var datas = {
        image_cover: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`
      };
    }
  }

  User.update(datas, {
    where: { user_id: id }
  })
    .then((user) => {
      if (user == 1) {
        return res.status(200).send({
          message: 'Profil Admin mis à jour.'
        });
      } else {
        return res.status(200).send({
          message: `Votre profile est mis à jour!`
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Erreur de mise à jour du profile'
      });
    });

};
