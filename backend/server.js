const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

var corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:8081',
    'http://localhost:8081'
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const sequelize = require('./app/models/connection-Db');

sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenu chez groupomania.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/follow.routes')(app);

// app.use('/public/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur écoute sur le port ${PORT}.`);
});

module.exports = app;
