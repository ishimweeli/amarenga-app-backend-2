const mongoose = require("mongoose");

const publicationsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        cloudinary_id: {
            type: String,
            required: false,
        },
        pdf: {
            type: String,
            required: false,
        },
        pdf_cloudinary_id: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Publications", publicationsSchema);
