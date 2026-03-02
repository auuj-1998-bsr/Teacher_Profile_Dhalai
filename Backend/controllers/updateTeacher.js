import db from "../database/db.js";

export default async function updateTeacherInfo(req, res) {
     console.log("FILE:", req.file);
    const rowUpdate = await req.body;
    const imageName = req.file ? req.file.filename : rowUpdate.image; // ** main file image 
    const id=Number(req.body.id);
    try {
        await db("history_profile_master").insert({
            ...rowUpdate,image:imageName, createdAt: new Date(),
            action: "UPDATE",
        });
        await db("profile_master").where("id", id)
            .update({...rowUpdate,image:imageName});
        res.status(200).json({ message: `${rowUpdate.id} id updated success` })
    }
    catch (err) {
        res.status(400).json({ "Error": err, message: "All field required" })
        console.log(err);

    }
};