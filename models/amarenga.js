const mongoose = require("mongoose");
const amarengaSchema = new mongoose.Schema({
  kinyarwanda: {
    type: String,
    },
    english: {
        type: String,
    },
    french: {
        type: String,
      },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
});
module.exports = mongoose.model("amarenga", amarengaSchema);