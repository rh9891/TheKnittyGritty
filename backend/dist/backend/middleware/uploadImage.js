import multer from "multer";
import { storage } from "../config/cloudinary.js";
const upload = multer({ storage });
export default upload;
