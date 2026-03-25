import db from "../database/db.js";
export async function teacherQuestions(req, res) {
    console.log(req.body);
    const { resultStatus, score, teacher_code, attempt } = req.body;
    if (resultStatus && score !== undefined) {
        try {
            await db("result").insert({
                result_status: resultStatus,
                score: score,
                teacher_code: teacher_code,
                attempt: attempt
            });
            res.status(201).json({ message: "Result Updated" })
        }
        catch (err) {
            console.error("ERROR:", err);
            res.status(500).json({
                error: "Result not Updated server Error",
                details: err.message
            });
        }
    }
    else {
        try {
            const resultData = await db("result")
                .where("teacher_code", teacher_code)
                .first();
                const result="Completed";
             if (resultData.result_status === "Pass") {
            return res.status(200).json({ result });
        }
            else {
                const allData = await db("questions as q")
                    .join("options as o", "q.id", "o.question_id")
                    .select(
                        "q.id as question_id",
                        "q.question",
                        "o.id",
                        "o.option_text",
                        "o.is_correct"
                    );
                return res.status(200).json({ allData }); 
            }
        }
        catch (err) {
            console.error("ERROR:", err);
            res.status(500).json({
                error: "Internal server error",
                details: err.message
            });
        }
    }
} 
