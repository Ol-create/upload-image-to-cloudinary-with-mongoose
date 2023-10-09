const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: String,
    public_id: String,
})

const Images = mongoose.model("Images", imageSchema)

module.exports = Images