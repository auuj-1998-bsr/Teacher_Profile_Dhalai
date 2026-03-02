import express from "express";
import {getTeacherProfile} from "../controllers/teacherController.js";
import addTeacherData from "../controllers/addTeacher.js"
import updateTeacher from "../controllers/updateTeacher.js"
import { checkAllFields } from "../Middleware/fieldMiddleware.js";
import { loginTeacher } from "../controllers/login.js";
import { upload } from "../Middleware/uploadImage.js";

const router = express.Router();
router.post("/login",loginTeacher);
router.post("/profile", getTeacherProfile);
router.post("/addTeacherData", checkAllFields, addTeacherData);
router.post("/updateTeacherinfo",upload.single("image"), updateTeacher);

export default router;