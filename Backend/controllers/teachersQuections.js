import db from "../database/db.js";

export async function teacherQuections(req, res) {
    try {
        const allQuection = await db("quection").select("*");
        res.status(200).json({ allQuection })
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }

}