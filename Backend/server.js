import express from "express";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3400;
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://teacher-profile-dhalai.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", teacherRoutes);

app.listen(port, () => {
  console.log("Server running on port " + port);
}); 