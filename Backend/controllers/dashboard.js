import db from "../database/db.js";
export async function getdashboard(req, res) {
    try {
        const countData = await db("profile_master")
            .select(
                db.raw(`COUNT(*)as total_records`),
                db.raw(`COUNT(CASE WHEN gender = '1' THEN 1 END) as male_count`),
                db.raw(`COUNT(CASE WHEN gender = '2' THEN 1 END) as female_count`),
                db.raw(`COUNT(CASE WHEN school_category_code = '1 - Primary School' THEN 1 END) as primary`),
                db.raw(`COUNT(CASE WHEN school_category_code = '2 - Upper primary School' THEN 1 END) as upper_primary`),
                db.raw(`COUNT(CASE WHEN school_category_code = '6 - Secondary School' THEN 1 END) as secondary`),
                db.raw(`COUNT(CASE WHEN school_category_code = '3 - Higher Secondary School' THEN 1 END) as higher_secondary`)
            ).first();
        console.log("Dashboard route hit");
        res.status(200).json({ countData });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}