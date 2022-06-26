var http = require('http');

const https = require("https");

const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Amarenga = require("../models/amarenga"); 

router.post("/amarenga", upload.single("image"), async (req, res) => {
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
    res.json({ error: err.message })
    }
});

  

router.get("/amarenga", async (req, res) => {
    try {
      let amarenga= await Amarenga.find();
      res.json(amarenga);
    } catch (err) {
      console.log(err);
    }
});
    

// router.get("/amarenga/", async (req, res) => {
//   try {
//     let amarenga= await Amarenga.find();
//     res.json(amarenga);
//   } catch (err) {
//     console.log(err);
//   }
// });
  


// router.delete("/:id", async (req, res) => {
//     try {
//       // Find user by id
//       let user = await User.findById(req.params.id);
//       // Delete image from cloudinary
//       await cloudinary.uploader.destroy(user.cloudinary_id);
//       // Delete user from db
//       await user.remove();
//       res.json(user);
//     } catch (err) {
//       console.log(err);
//     }
// });
    

// router.post("/amarenga", upload.single("image"), async (req, res) => {
//     try {
//     //   let amarenga = await amarenga.findById(req.params.id);
//       // Delete image from cloudinary
//     //   await cloudinary.uploader.destroy(amare.cloudinary_id);
//       // Upload image to cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);
//       const data = {
//           kinyarwanda: req.body.name || amarenga.kinyarwanda,
//           english: req.body.name || amarenga.english,
//           french: req.body.name || amarenga.french,
//          avatar: result.secure_url || amarenga.avatar,
//         cloudinary_id: result.public_id || amarenga.cloudinary_id,
//       };
//       amarenga = await amarenga.createUserAsync(req.params.data, {
//    new: true
//    });
//       res.json(amarenga);
//     } catch (err) {
//       console.log(err);
//     }});
 module.exports = router;