import db from "../database/db.js";
import { createPdf } from "../services/createPdf.js";
import { downloadExcelFile } from "../services/createExcel.js";

export async function getTeacherProfile(req, res) {
    try {
        const page = parseInt(req.body.page);
        const limit = parseInt(req.body.limit);
        const offset = ((page - 1) * limit);
        const gender = req.body.gender !== "0" ? Number(req.body.gender) : null;
        const schooltype = req.body.schooltype !== "0" ? Number(req.body.schooltype) : null;
        const udiseCode = req.body.udiseCode !== "0" ? Number(req.body.udiseCode) : null
        const doj = req.body.doj !== "0" ? req.body.doj : null;
        const block = req.body.block !== "0" ? req.body.block : null;
        const download = req.body.download;
        const selectTeacherId = Number(req.body.selectTeacherId);
        let baseQuery = db("profile_master").select("*");
        console.log(block);
        const rowData = baseQuery.where((q) => {
            udiseCode && q.where("udise_code", udiseCode);
            gender && q.where("gender", gender);
            schooltype && q.where("school_category_code", "like", `${schooltype}%`);
            doj && q.whereBetween("doj_service", [`${doj}-01-01`, `${doj}-31-12`]);
            block && q.where("block_name_code", "like", `${block}%`);
            selectTeacherId && q.where("id", `${selectTeacherId}`)
        });
        const filterrawdata = await rowData;
        if (download === "excel") {
            return downloadExcelFile(filterrawdata, res);
        }
        if (download === "pdf") {
            return createPdf(filterrawdata, res);
        }
        const totalCount = (await rowData).length;
        const teacherProfileData = await rowData.limit(limit).offset(offset).orderBy("id");
        res.status(200).json({ teacherProfileData, totalCount });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}


