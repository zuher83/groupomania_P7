const sequelize = require("./connection-Db");

const Sequelize = require("sequelize");
const { SequelizeScopeError } = require("sequelize");


var initModels = require('../models/init-models');
var db = initModels(sequelize);

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // db.user = ;
// // db.role = require("./init-models.js");
// db.user = require("./users.js")(sequelize, Sequelize);
// db.role = require("./roles.js")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
