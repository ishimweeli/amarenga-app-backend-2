const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const HomeImage = require("../models/homeImage");
const Program = require("../models/program");

// Home Carousel Images

// Upload home image
router.post("/home-images", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let homeImage = new HomeImage({
      image: result.secure_url,
      cloudinary_id: result.public_id,
      article: req.body.article
    });
    await homeImage.save();
    res.json(homeImage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Update home image
router.put("/home-images/:id", upload.single("image"), async (req, res) => {
  try {
    let homeImage = await HomeImage.findById(req.params.id);
    await cloudinary.uploader.destroy(homeImage.cloudinary_id);
    
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const data = {
      image: result?.secure_url || homeImage.image,
      cloudinary_id: result?.public_id || homeImage.cloudinary_id,
      article: req.body.article || homeImage.article
    };

    homeImage = await HomeImage.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(homeImage);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
});

// Program Images

// Upload program
router.post("/programs", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let program = new Program({
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon,
      image: result.secure_url,
      cloudinary_id: result.public_id
    });
    await program.save();
    res.json(program);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Update program
router.put("/programs/:id", upload.single("image"), async (req, res) => {
  try {
    let program = await Program.findById(req.params.id);
    
    let result;
    if (req.file) {
      await cloudinary.uploader.destroy(program.cloudinary_id);
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const data = {
      title: req.body.title || program.title,
      description: req.body.description || program.description,
      icon: req.body.icon || program.icon,
      image: result?.secure_url || program.image,
      cloudinary_id: result?.public_id || program.cloudinary_id
    };

    program = await Program.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(program);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;