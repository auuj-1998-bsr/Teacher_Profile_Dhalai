// import db from "../database/db.js";
// import { createPdf } from "../services/createPdf.js";
// import { downloadExcelFile } from "../services/createExcel.js";

// export async function getTeacherProfile(req, res) {
//     try {
//         const page = parseInt(req.body.page);
//         const limit = parseInt(req.body.limit);
//         const offset = ((page - 1) * limit);
//         const gender = req.body.gender !== "0" ? Number(req.body.gender) : null;
//         const schooltype = req.body.schooltype !== "0" ? Number(req.body.schooltype) : null;
//         const udiseCode = req.body.udiseCode !== "0" ? Number(req.body.udiseCode) : null
//         const block = req.body.block !== "0" ? req.body.block : null;
//         const download = req.body.download;
//         const selectTeacherId = Number(req.body.selectTeacherId);
//         let baseQuery = db("profile_master").select("*");
//         console.log(block);
//         const rowData = baseQuery.where((q) => {
//             udiseCode && q.where("udise_code", udiseCode);
//             gender && q.where("gender", gender);
//             schooltype && q.where("school_category_code", "like", `${schooltype}%`);
//             block && q.where("block_name_code", "like", `${block}%`);
//             selectTeacherId && q.where("id", `${selectTeacherId}`)
//         });
//         const filterrawdata = await rowData;
//         if (download === "excel") {
//             return downloadExcelFile(filterrawdata, res);
//         }
//         if (download === "pdf") {
//             return createPdf(filterrawdata, res);
//         }
//         const totalCount = (await rowData).length;
//         const teacherProfileData = await rowData.limit(limit).offset(offset).orderBy("id","asc");
//         res.status(200).json({ teacherProfileData, totalCount });
//     }
//     catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }




import pool from "../database/db.js";
import { createPdf } from "../services/createPdf.js";
import { downloadExcelFile } from "../services/createExcel.js";

export async function getTeacherProfile(req, res) {
  try {
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const offset = (page - 1) * limit;

    const gender = req.body.gender !== "0" ? Number(req.body.gender) : null;
    const schooltype = req.body.schooltype !== "0" ? Number(req.body.schooltype) : null;
    const udiseCode = req.body.udiseCode !== "0" ? Number(req.body.udiseCode) : null;
    const block = req.body.block !== "0" ? req.body.block : null;
    const download = req.body.download;
    const selectTeacherId = Number(req.body.selectTeacherId);

    // 🔥 Dynamic WHERE clause
    let conditions = [];
    let values = [];
    let index = 1;

    if (udiseCode) {
      conditions.push(`udise_code = $${index++}`);
      values.push(udiseCode);
    }

    if (gender) {
      conditions.push(`gender = $${index++}`);
      values.push(gender);
    }

    if (schooltype) {
      conditions.push(`school_category_code LIKE $${index++}`);
      values.push(`${schooltype}%`);
    }

    if (block) {
      conditions.push(`block_name_code LIKE $${index++}`);
      values.push(`${block}%`);
    }

    if (selectTeacherId) {
      conditions.push(`id = $${index++}`);
      values.push(selectTeacherId);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    // ✅ Fetch all filtered data (for download)
    const fullQuery = `SELECT * FROM profile_master ${whereClause}`;
    const fullResult = await pool.query(fullQuery, values);
    const filterrawdata = fullResult.rows;

    if (download === "excel") {
      return downloadExcelFile(filterrawdata, res);
    }

    if (download === "pdf") {
      return createPdf(filterrawdata, res);
    }

    // ✅ Count
    const countQuery = `SELECT COUNT(*) FROM profile_master ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const totalCount = parseInt(countResult.rows[0].count);

    // ✅ Pagination query
    const paginatedQuery = `
      SELECT * FROM profile_master
      ${whereClause}
      ORDER BY id ASC
      LIMIT $${index++} OFFSET $${index}
    `;

    const paginatedResult = await pool.query(paginatedQuery, [
      ...values,
      limit,
      offset,
    ]);

    res.status(200).json({
      teacherProfileData: paginatedResult.rows,
      totalCount,
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}