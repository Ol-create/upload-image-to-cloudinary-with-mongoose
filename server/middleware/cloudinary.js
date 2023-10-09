require("dotenv").config()
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => "folder_name",
    format: async (req, file) => {
      const transformations = [
        { width: 800, height: 800, crop: "limit" }, // Transformation for JPEG
        { width: 600, height: 600, crop: "limit" }, // Transformation for PNG
        { width: 400, height: 400, crop: "limit" }, // Transformation for GIF
      ];

      const transformedFiles = await Promise.all(
        transformations.map(async (transformation) => {
          const transformedFile = await cloudinary.uploader.upload(file.path, {
            transformation,
          });
          return transformedFile.format;
        })
      );

      return transformedFiles;
    },
    public_id: (req, file) => "some_unique_id",
  },
});


const parser = multer({ storage: storage });

module.exports = parser;
