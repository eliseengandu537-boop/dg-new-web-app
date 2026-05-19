import multer from "multer";
import path from "path";
import fs from "fs";
import { getUploadSubdirPath } from "../utils/uploads";

const createStorage = (subfolder: string) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => {
      const dir = getUploadSubdirPath(subfolder);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (_req, file, cb) => {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, unique + path.extname(file.originalname).toLowerCase());
    },
  });

const imageFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  if (allowed.test(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
};

const documentFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = /pdf|jpg|jpeg|png/;
  if (allowed.test(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files are allowed."));
  }
};

export const uploadBrokerPhoto = multer({
  storage: createStorage("brokers"),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("photo");

export const uploadPropertyImages = multer({
  storage: createStorage("properties"),
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
]);

export const uploadPropertyDocs = multer({
  storage: createStorage("documents"),
  fileFilter: documentFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
}).fields([
  { name: "brochurePdf", maxCount: 1 },
  { name: "floorPlans", maxCount: 10 },
]);

export const uploadAny = multer({
  storage: createStorage("misc"),
  limits: { fileSize: 20 * 1024 * 1024 },
}).any();

export const uploadStoryFiles = multer({
  storage: createStorage("stories"),
  limits: { fileSize: 20 * 1024 * 1024 },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "brochure", maxCount: 1 },
]);

export const uploadNewsImage = multer({
  storage: createStorage("news"),
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");
