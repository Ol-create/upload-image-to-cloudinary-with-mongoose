const express = require("express")
const parser = require("../middleware/cloudinary")
const Image = require("../models/images")

const router = express.Router();


router.post("/", parser.single("image"), (req, res) => {
  console.log(req.file); // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.public_id = req.file.public_id;
  Image.create(image) // save image information in database
    .then((newImage) => res.json(newImage))
    .catch((err) => console.log(err));
});

module.exports = router
