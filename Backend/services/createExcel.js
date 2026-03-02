import ExcelJS from "exceljs";

export const downloadExcelFile = async (query, res) => {
  try {
    const data = await query;

    if (!data.length) {
      return res.status(404).json({
        success: false,
        message: "No records found",
      });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Teacher Report");

    sheet.mergeCells("A1:AA1");
    sheet.getCell("A1").value = "Teacher Report";
    sheet.getCell("A1").font = {bold: true, size: 16, color: { argb: "FFFFFFFF" }};
    sheet.getCell("A1").alignment = { horizontal: "center" };

    sheet.mergeCells("A2:G2");
    sheet.getCell("A2").value = "School Details";
    sheet.getCell("A2").alignment = { horizontal: "center" };

    sheet.mergeCells("H2:L2");
    sheet.getCell("H2").value = "Teacher Personal";
    sheet.getCell("H2").alignment = { horizontal: "center" };

    sheet.mergeCells("M2:R2");
    sheet.getCell("M2").value = "Qualification";
    sheet.getCell("M2").alignment = { horizontal: "center" };

    sheet.mergeCells("S2:U2");
    sheet.getCell("S2").value = "Languages";
    sheet.getCell("S2").alignment = { horizontal: "center" };

    sheet.mergeCells("V2:AA2");
    sheet.getCell("V2").value = "Job Details";
    sheet.getCell("V2").alignment = { horizontal: "center" };

    sheet.getRow(2).font = { bold: true };

    const headers = [
      "academic_year",
      "udise_code",
      "school_name",
      "district_name_code",
      "block_name_code",
      "school_category_code",
      "school_type",

      "teacher_name",
      "gender",
      "dob",
      "teacher_code",
      "social_category",

      "hig_qual_acad",
      "trade",
      "maths_studied_upto",
      "science_studied_upto",
      "english_studied_upto",
      "soc_study_upto",

      "language_1",
      "language_2",
      "language_3",

      "doj_service",
      "appointed_for_level",
      "appointed_subject",
      "sub_taught_1",
      "sub_taught_2",
      "teacher_school_guest_contractual",
    ];

    sheet.addRow(headers).font = { bold: true };
    data.forEach((item) => {
      sheet.addRow(headers.map((h) => item[h] ?? ""));
    });

    sheet.columns.forEach((col) => {
      col.width = 20;
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=teacher_report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.status(200);
    res.end();

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};