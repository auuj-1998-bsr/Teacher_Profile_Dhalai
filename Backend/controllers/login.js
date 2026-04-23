import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../database/db.js";
import { UAParser } from "ua-parser-js";

export const loginTeacher = async (req, res) => {
  const { loginType, teacher_code, password } = req.body;
  const hash = await bcrypt.hash("123456", 10);
  const teacher = await db("profile_master").where("teacher_code", teacher_code).first();
  try {
    if (!teacher)
      return res.status(401).json({ message: "Teacher_Code not found" });

    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch)
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({
      teacher_code: teacher.teacher_code,
      teacher_name: teacher.teacher_name,
      teacher:teacher,
    },
      "mysecret123",
      { expiresIn: "1d" }
    );

    //login info 
    const parser = new UAParser(req.headers['user-agent']);
    const result = parser.getResult();
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress;
    const browser = `${result.browser.name} ${result.browser.version}`;
    const device = `${result.os.name} ${result.os.version}`;
    console.log(result);
    await db("login_logs").insert({
      teacher_code: teacher_code,
      ip_address: ip,
      browser: browser,
      device: device,
    })
    res.json({ token, message: "Login_Success" });
  }
  catch (err) {
  console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};