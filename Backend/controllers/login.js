import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../database/db.js";

export const loginTeacher = async (req, res) => {
  const { teacher_code, password } = req.body.form;
  const hash = await bcrypt.hash("123456", 10);

  const teacher = await db("profile_master").where("teacher_code", teacher_code)
  console.log(teacher);
  if (!teacher)
    return res.status(401).json({ message: "Teacher not found" });

  const isMatch = await bcrypt.compare(password, hash);
  if (!isMatch)
    return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign({ id: teacher.id, name: teacher.name },
    "mysecret123",
    { expiresIn: "1d" }
  );
  res.json({ token, teacher: { name: teacher.teacher_name } });
};