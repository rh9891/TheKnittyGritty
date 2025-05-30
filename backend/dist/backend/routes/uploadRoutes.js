"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, path_1.default.join("backend", "uploads"));
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb("Images only!");
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});
router.post("/", upload.single("image"), (req, res) => {
    res.send({
        message: "Image uploaded successfully.",
        image: `/${req.file?.path}`,
    });
});
exports.default = router;
