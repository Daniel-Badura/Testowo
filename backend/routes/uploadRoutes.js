import express from "express";
import multer from "multer";
import path from "path";
import colors from "colors";
import { authenticator, isAdmin } from "../middleware/authMiddleware.js";
import File from "../models/fileModel.js";
import dotenv from "dotenv";
import { Storage } from "@google-cloud/storage";

dotenv.config();

const router = express.Router();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

// @desc Google Cloud Storage
let projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
let credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
let bucketURL = process.env.GOOGLE_CLOUD_STORAGE_BUCKET_URL;
let bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME;
const storage = new Storage({
  name: bucketName,
  projectId: projectId,
  credentials: credentials,
});
const bucket = storage.bucket(bucketName);

// @desc Multer
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// @desc    Upload file
router.post(
  "/",
  authenticator,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    // res.send(`/${req.file.path}`);
    try {
      if (req.file) {
        let filename = req.file.originalname;
        let path = `${bucketURL}/${filename}`;
        const file = new File({
          filename: filename,
          path: path,
        });

        await file.save();
        const blob = bucket.file(filename);
        const blobStream = blob.createWriteStream();
        blobStream.on("finish", () => {
          res.status(200).json({
            message: "File uploaded successfully",
            filename: path,
          });
        });
        blobStream.end(req.file.buffer);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
