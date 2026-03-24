import db from "../database/db.js";
export async function teacherQuestions(req, res) {
    console.log(req.body);
    const teacher_code = req.body.teacher_code;
    const resultStatus = req.body.resultStatus;
    const score=req.body.score;
    try {
    if(resultStatus || score ){
        await db("result").insert({
            // teacher_code: teacher_code,
            resultStatus: resultStatus,
            score:score,
        });
    }
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
    } catch (err) {
        res.status(500).json({
            error: "Internal server error",
            details: err.message
        });
    }
}