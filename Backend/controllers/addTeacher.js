import db from "../database/db.js";
export default async function addTeacherData(req, res)  {
    
    try {
        const teacherinfo = req.body.teacherinfo;
        const { id, ...data } = teacherinfo;
        await db("profile_master").insert(data);

        res.status(201).json({
            message: " Created successfully"
        });
    }
    catch (err) {
        res.json({ Error: err, message: "All field required" });
        console.log("Error", err);
    }
};

