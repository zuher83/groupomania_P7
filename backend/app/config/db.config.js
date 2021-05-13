module.exports = {
  HOST: "127.0.0.1",
  USER: "oc_social",
  PASSWORD: "20042006",
  DB: "groupomania3",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
