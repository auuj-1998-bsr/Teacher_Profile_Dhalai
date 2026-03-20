import express from "express";
import { getTeacherProfile } from "../controllers/teacherController.js";
import addTeacherData from "../controllers/addTeacher.js"
import updateTeacher from "../controllers/updateTeacher.js"
import { checkAllFields } from "../Middleware/fieldMiddleware.js";
import { loginTeacher } from "../controllers/login.js";
import { uploads } from "../Middleware/uploadImage.js";
import { getdashboard } from "../controllers/dashboard.js";
import { teacherQuections } from "../controllers/teachersQuections.js";

const router = express.Router();
router.post("/login", loginTeacher);
router.post("/dashboard", getdashboard);
router.post("/profile", getTeacherProfile);
router.post("/addTeacherData", checkAllFields, addTeacherData);
router.post("/teachersQuiz",teacherQuections);
router.post("/updateTeacherinfo", uploads.single("image"), updateTeacher);

export default router;