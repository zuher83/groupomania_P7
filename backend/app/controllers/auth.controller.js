const db_index = require('../models/connection-Db');
const db = require('../models/index');
const config = require('../config/auth.config');
const User = db.users;
const Role = db.user_roles;

const Op = db_index.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  // Creation de l'utilisateur dans la BD
  User.create({
    name: req.body.name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    birth_date: req.body.birth_date,
    joined: new Date().getTime()
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.json({
              message:
                'Félicitation votre compte a bien été crée! Vous allez être redirigé vers la page de connexion'
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.json({
            message:
              'Félicitation votre compte a bien été crée! Vous allez être redirigé vers la page de connexion'
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res.status(401).json({
          accessToken: null,
          message: 'Mot de passe invalide!'
        });
      }

      var token = jwt.sign({ id: user.user_id }, config.secret, {
        expiresIn: 86400 // 24 heures
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).json({
          user_id: user.user_id,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
