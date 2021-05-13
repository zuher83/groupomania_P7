const multer = require('multer');
const uuidv4 = require('uuid/v4');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'backend/public/images');
  },

  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];

    callback(null, uuidv4() + name + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');
