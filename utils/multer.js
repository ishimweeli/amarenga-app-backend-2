const multer = require("multer");
const path = require("path"); 
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
      if (ext !== ".pdf" && ext !== '.gif' && ext !== '.zip') {
      cb(console.log("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
