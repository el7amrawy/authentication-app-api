import multer from "multer";
import fs from "fs";
import path from "path";

const appRoot = path.resolve();
let imageName: string;

const storage = multer.diskStorage({
  destination: function (_req, _file, callback) {
    const uploadsPath = path.join(appRoot, "uploads");
    const destPath = path.join(appRoot, "uploads", "images");

    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }

    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
    callback(null, destPath);
  },
  filename: function (_req, file, callback) {
    imageName =
      file.fieldname + "-" + Date.now() + `.${file.mimetype.split("/")[1]}`;
    callback(null, imageName);
  },
});

const uploadImages = multer({
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  storage,
}).any();

export { uploadImages, imageName, appRoot };
