const mongoose = require("mongoose");
const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    },
    content: {
        type: String,
    },

  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});
module.exports = mongoose.model("announcement", AnnouncementSchema);