import db from "../database/db.js";
export default async function addTeacherData(req, res)  {
    
    try {
        const teacherinfo = req.body.teacherinfo;
        await db("profile_master").insert({
            ...teacherinfo,
        });
        res.status(201).json({
            message: "Data created successfully"
        });
    }
    catch (err) {
        res.json({ Error: err, message: "All field required" });
        console.log("Error", err);
    }
};

