const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Publications = require("../models/publications");

router.post("/publication", upload.fields([ { name: "image", maxCount: 1 }, { name: "pdf", maxCount: 1 } ]), async (req, res) => {
    try {
        const pdfResult = await cloudinary.uploader.upload(req.files.pdf[ 0 ].path);

        const publications = new Publications({
            title: req.body.title,
            description: req.body.description,
            pdf: pdfResult.secure_url,
            pdf_cloudinary_id: pdfResult.public_id,
        });

        await publications.save();

        res.json(publications);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error",err });
    }
});

router.get("/publication", async (req, res) => {
    try {
        const publications = await Publications.find();
        res.json(publications);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/publication/:id", async (req, res) => {
    try {
        const publications = await Publications.findById(req.params.id);
        await cloudinary.uploader.destroy(publications.pdf_cloudinary_id);

        await Publications.deleteOne(publications);

        res.json({ message: "Publication deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/publication/:id", upload.fields([ { name: "image", maxCount: 1 }, { name: "pdf", maxCount: 1 } ]), async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);

    
        if (req.files.pdf && req.files.pdf.length > 0) {
            await cloudinary.uploader.destroy(publication.pdf_cloudinary_id);

            const pdfResult = await cloudinary.uploader.upload(req.files.pdf[ 0 ].path);

            publication.pdf = pdfResult.secure_url;
            publication.pdf_cloudinary_id = pdfResult.public_id;
        }

        if (req.body.title) {
            publication.title = req.body.title;
        }

        if (req.body.description) {
            publication.description = req.body.description;
        }

        await publication.save();

        res.json(publication);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/publication/:id", async (req, res) => {
    try {
        const publication = await Publications.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({ message: "Publication not found" });
        }

        res.json(publication);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
