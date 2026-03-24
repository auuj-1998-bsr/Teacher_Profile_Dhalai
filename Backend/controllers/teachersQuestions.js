import db from "../database/db.js";
export async function teacherQuestions(req, res) {
    console.log(req.body);
    const { resultStatus, score } = req.body;
    if (!resultStatus || score === null) {
        try {
            await db("result").insert({
                resultStatus: resultStatus,
                score: score,
            });
            res.status(201).json({ message: "Result Updated" })
        }
        catch (err) {
            res.status(500).json({
                error: "Result not Updated server Error",
                details: err.message
            });
        }
    }
    else {
        try {
            const allData = await db("questions as q")
                .join("options as o", "q.id", "o.question_id")
                .select(
                    "q.id as question_id",
                    "q.question",
                    "o.id",
                    "o.option_text",
                    "o.is_correct"
                );
            res.status(200).json({ allData });
        }
        catch (err) {
            res.status(500).json({
                error: "Internal server error",
                details: err.message
            });
        }
    }
} 
