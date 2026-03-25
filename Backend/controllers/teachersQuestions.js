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
            const resultData = await db("result").select("*")
            if (teacher_code === resultData.teacher_code && resultData.result_status === "Pass") {
                const result = "Completed"
                res.status(200).json({ result });
            }
            // else if (teacher_code === resultData.teacher_code && resultData.result_status === "Fail") {
            //     const attempt = resultData.attempt;
            //     const allData = await db("questions as q")
            //         .join("options as o", "q.id", "o.question_id")
            //         .select(
            //             "q.id as question_id",
            //             "q.question",
            //             "o.id",
            //             "o.option_text",
            //             "o.is_correct"
            //         );
            //     res.status(200).json({ allData });
            // }
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
                res.status(200).json({ allData });
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
