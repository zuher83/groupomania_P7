var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _follow_user = require("./follow_user");
var _likes = require("./likes");
var _posts = require("./posts");
var _roles = require("./roles");
var _user_roles = require("./user_roles");
var _users = require("./users");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var follow_user = _follow_user(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var user_roles = _user_roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  roles.belongsToMany(users, { as: 'users', through: user_roles, foreignKey: "roleId", otherKey: "userId" });
  users.belongsToMany(roles, { as: 'roles', through: user_roles, foreignKey: "userId", otherKey: "roleId" });
  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  likes.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(likes, { as: "likes", foreignKey: "post_id"});
  user_roles.belongsTo(roles, { as: "role", foreignKey: "roleId"});
  roles.hasMany(user_roles, { as: "user_roles", foreignKey: "roleId"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  follow_user.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(follow_user, { as: "follow_users", foreignKey: "user_id"});
  follow_user.belongsTo(users, { as: "follower", foreignKey: "follower_id"});
  users.hasMany(follow_user, { as: "follower_follow_users", foreignKey: "follower_id"});
  likes.belongsTo(users, { as: "like_by_user", foreignKey: "like_by"});
  users.hasMany(likes, { as: "likes", foreignKey: "like_by"});
  user_roles.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(user_roles, { as: "user_roles", foreignKey: "userId"});

  return {
    comments,
    follow_user,
    likes,
    posts,
    roles,
    user_roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
