import express from "express";
import upload from "../middleware/uploadImage.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    image: req.file.path,
  });
});

export default router;
