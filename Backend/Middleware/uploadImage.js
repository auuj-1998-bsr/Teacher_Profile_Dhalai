import multer from "multer";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "_" + cleanName);
  },
});

const uploads = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export { uploads };

// ///multer is a node-js middleware for handling multipart/form-data, uploading(file,image pdf)....  





