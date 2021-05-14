// import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

import { protect, isAdmin } from "../middleware/authMiddleware.js";

import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG image are allowed."),
      false
    );
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: `the-knitty-gritty-images`,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const returnImageUrl = (req, res) => {
  return res.send(`${req.file.location}`);
};

router
  .route("/")
  .post(protect, isAdmin, upload.single("image"), returnImageUrl);

export default router;

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("Only image files accepted.");
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// router.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

// export default router;

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("Only image files accepted.");
//   }
// }

// WILL NEED THIS BIT

// import path from "path";
// import express from "express";
// import multer from "multer";
// const router = express.Router();

// import { protect, isAdmin } from "../middleware/authMiddleware";

// import multerS3 from "multer-s3";
// import aws from "aws-sdk";

// const s3 = new aws.S3();
// aws.config.update({
//   accessKeyID: process.env.AWS_ACCESS_KEY_ID,
//   accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: "us-east-2",
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Invalid file type. Only JPEG and PNG image are allowed."),
//       false
//     );
//   }
// };

// const upload = multer({
//   fileFilter,
//   storage: multerS3({
//     acl: "public-read",
//     s3: s3,
//     bucket: `the-knitty-gritty-images`,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: "TESTING_METADATA" });
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString());
//     },
//   }),
// });

// const returnImageUrl = (req, res) => {
//   return res.send(`${req.file.location}`);
// };

// router
//   .route("/")
//   .post(protect, isAdmin, upload.single("image"), returnImageUrl);

// export default router;

// OLD REPO
