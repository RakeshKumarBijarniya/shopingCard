const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/shoping-website/public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
