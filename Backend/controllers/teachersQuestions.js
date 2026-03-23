    import db from "../database/db.js";
     export async function teacherQuestions(req, res) {
       try {
    const allQuestion = await db("questions").select("*");
    const allOptions=await db("options").select("*");
    res.status(200).json({ allQuestion,allOptions });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message
    });
  }
}