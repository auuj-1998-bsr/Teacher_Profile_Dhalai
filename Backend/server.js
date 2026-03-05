import express from "express";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const port = 3400;


app.use("/", teacherRoutes);

app.listen(port, () => {
    console.log("Server is running this port 3400...");
});