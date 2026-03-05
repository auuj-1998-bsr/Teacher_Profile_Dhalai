import fs from "fs";
import path from "path";
import ejs from "ejs";
import puppeteer from "puppeteer";

const MOefilepath = path.join(process.cwd(), "public", "MOe_logo.png");
const Nicfilepath = path.join(process.cwd(), "public", "nisi_logo.png");
const MOelogobase = `data:image/png;base64,${fs.readFileSync(MOefilepath, "base64")}`;
const Niclogobase = `data:image/png;base64,${fs.readFileSync(Nicfilepath, "base64")}`;

export const createPdf = async (rowData, res) => {
    try {
        const profilereportdata = await rowData;
        if (!profilereportdata.length) {
            return res.status(404).json({
                success: false,
                massage: "No record found",
            })
        }
        const tamplatepath = path.join(process.cwd(), "EJSFiles", "pdfFile.ejs");
        const htmlcode = await ejs.renderFile(tamplatepath, { profilereportdata: profilereportdata, });
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
        });
        const page = await browser.newPage();
        await page.setContent(htmlcode, { waitUntil: "domcontentloaded", });
        const profilereportDownlaodPdf = await page.pdf({
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,
            margin: { top: "80px", bottom: "60px", left: "20px", right: "20px" },
            headerTemplate: `<div style="width:100%; position:relative;font-size:10px; padding:5px 20px;border-bottom:1px solid #ccc;">
                       <img src="${MOelogobase}"  style="height:50px; width:auto; position:absolute; left:10px; top:1px;" />
                       <div style="text-align:center;font-size:16px;font-weight:bold;width:100%;line-height:50px;">Teacher Data Report</div>
               </div>
`,
            footerTemplate: `
                   <div style="width:100%;font-size:9px;padding:5px 20px;border-top:1px solid #ccc;display:flex;align-items:center;justify-content:space-between;">
                           <img src="${Niclogobase}"  style="height:60px; width:auto; position:fix; left:10px; top:1px;" /> 
                              <span> Generated on: ${new Date().toLocaleString()} </span>
                              <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
                             </div>`,
        });
        await browser.close();
        res.setHeader("content-type", "application/pdf");
        res.setHeader("content-Disposition", "attachment; filename=ProfileReport.Pdf");
        res.status(200);
        return res.end(profilereportDownlaodPdf);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    };
};