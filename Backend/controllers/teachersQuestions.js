import db from "../database/db.js";
export async function teacherQuestions(req, res) {
    try {
        const allData = await db("questions as q")
            .join("options as o", "q.id", "o.question_id")
            .select(
                "q.id as question_id",
                "q.question",
                "o.id",
                "o.option_text"
            );
        res.status(200).json({ allData });
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
            details: err.message
        });
    }
}