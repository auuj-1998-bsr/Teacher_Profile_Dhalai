// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import db from "../database/db.js";
// import { UAParser } from "ua-parser-js";

// export const loginTeacher = async (req, res) => {
//   const { loginType, teacher_code, password } = req.body;
//   const hash = await bcrypt.hash("123456", 10);
//   const teacher = await db("profile_master").where("teacher_code", teacher_code).first();
//   try {
//     if (!teacher)
//       return res.status(401).json({ message: "Teacher_Code not found" });

//     const isMatch = await bcrypt.compare(password, hash);
//     if (!isMatch)
//       return res.status(401).json({ message: "Wrong password" });

//     const token = jwt.sign({
//       teacher_code: teacher.teacher_code,
//       teacher_name: teacher.teacher_name,
//       teacher:teacher,
//     },
//       "mysecret123",
//       { expiresIn: "1d" }
//     );

//     //login info 
//     const parser = new UAParser(req.headers['user-agent']);
//     const result = parser.getResult();
//     const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress;
//     const browser = `${result.browser.name} ${result.browser.version}`;
//     const device = `${result.os.name} ${result.os.version}`;
//     console.log(result);
//     await db("login_logs").insert({
//       teacher_code: teacher_code,
//       ip_address: ip,
//       browser: browser,
//       device: device,
//     })
//     res.json({ token, message: "Login_Success" });
//   }
//   catch (err) {
//   console.error("LOGIN ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };




import jwt from "jsonwebtoken";
import pool from "../database/db.js"; // ✅ pg pool
import { UAParser } from "ua-parser-js";

export const loginTeacher = async (req, res) => {
  try {
    const { teacher_code, password } = req.body;

    // ✅ SELECT query (pg)
    const result = await pool.query(
      "SELECT * FROM profile_master WHERE teacher_code = $1",
      [teacher_code]
    );

    const teacher = result.rows[0];

    if (!teacher) {
      return res.status(401).json({ message: "Teacher_Code not found" });
    }

    // 🔥 SIMPLE PASSWORD CHECK (if plain text in DB)
    const isMatch = password === teacher.password;

    // 👉 अगर password hashed है तो use:
    // const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        teacher_code: teacher.teacher_code,
        teacher_name: teacher.teacher_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 login_logs insert
    const parser = new UAParser(req.headers["user-agent"]);
    const ua = parser.getResult();

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress;

    const browser = `${ua.browser.name || ""} ${ua.browser.version || ""}`;
    const device = `${ua.os.name || ""} ${ua.os.version || ""}`;

    await pool.query(
      "INSERT INTO login_logs (teacher_code, ip_address, browser, device) VALUES ($1, $2, $3, $4)",
      [teacher_code, ip, browser, device]
    );

    res.json({ token, message: "Login_Success" });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};