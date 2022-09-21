var http = require('http');

const https = require("https");

const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Amarenga = require("../models/amarenga"); 
const  isAuthenticated = require("../middleware/checkAuth");
const Announcement = require('../models/announcement');

router.post("/announcement", upload.single("file"), async (req, res) => {
  // console.log(req)
  console.log("salamaaa")

  try {

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);



     // Create new user
      let announcement = new Announcement({
        title: req.body.title,
        content: req.body.content,
        avatar: result.secure_url,
        cloudinary_id: result.public_id
      });

    // console.log(req.body)
    // Save user

    await announcement.save();
    console.log("announcement is:", announcement)
    res.json(announcement);
  } catch (err) {
    // console.log(err.message);
    console.log(err)
    }
});

  

router.get("/announcement", async (req, res) => {
    try {
      let announcement= await Announcement.find();
     
      res.json(announcement);
    } catch (err) {
     res.json(error)
    }
});


router.delete("/announcement/delete/:id", async (req, res) => {
  try {
    // Find user by id
    let announcement = await Announcement.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(announcement.cloudinary_id);
    // // Delete user from db
    await Announcement.deleteOne(announcement)

    res.json(console.log("sucess"));
    
  } catch (error) {
    console.log(error);
  }
});
 module.exports = router;