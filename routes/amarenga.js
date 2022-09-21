var http = require('http');

const https = require("https");
const path = require("path");
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Amarenga = require("../models/amarenga"); 
const  isAuthenticated = require("../middleware/checkAuth")

router.post("/amarenga",upload.single("image"), async (req, res) => {
  // console.log(req)
  console.log("salamaaa")

  try {

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);



     // Create new user
      let amarenga = new Amarenga({
        kinyarwanda: req.body.kinyarwanda,
        english: req.body.english,
        french: req.body.french,
        avatar: result.secure_url,
        cloudinary_id: result.public_id
      });

    console.log(req.body)
    // Save user

    await amarenga.save();
    console.log("The saved marenga is:", amarenga)
    res.json(amarenga);
  } catch (err) {
    // console.log(err.message);
    console.log(err)
    }
});

  

router.get("/amarenga", async (req, res) => {
    try {
      let amarenga= await Amarenga.find();
     
      res.json(amarenga);
    } catch (err) {
     res.json(error)
    }
});



router.delete("/amarenga/delete/:id", async (req, res) => {
  try {
    // Find user by id
    let amarenga = await Amarenga.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(amarenga.cloudinary_id);
    // // Delete user from db
    await Amarenga.deleteOne(amarenga)

    res.json(console.log("sucess"));
    
  } catch (error) {
    console.log(error);
  }
});




router.put("/amarenga/update/:id",upload.single("image"), async (req, res) => {
  try {
    let amarenga = await Amarenga.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(amarenga.cloudinary_id);
    // Upload new image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      
 kinyarwanda: req.body.kinyarwanda || amarenga.kinyarwanda,
        english: req.body.english || amarenga.english,
        french: req.body.french || amarenga.french,
        avatar: result.secure_url  || amarenga.avatar,
        cloudinary_id: result.public_id || amarenga.cloudinary_id

    };
    amarenga = await Amarenga.findByIdAndUpdate(req.params.id, data, {
      new: false
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
    

 module.exports = router;