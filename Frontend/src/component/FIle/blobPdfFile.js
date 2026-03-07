// import { ApiData } from "../../services/api"
// export const handleTeacherReports = async () => {
//     try{
//     const response = await ApiData.post("/teacherProfile", 
//         {download:true}, //body
//         {responseType: "blob"}  //config
//     )
//     if (response.data.type === "application/json") {
//         const text = await response.data.text();
//         console.error("Backend error:", text);
//         alert("Server error while generating PDF");
//         return;
//       }
//     console.log(response);
//     const blob=new Blob([response.data]);
//     const url = window.URL.createObjectURL(blob);
//      const a = document.createElement("a");
//       a.href = url;
//       a.download = "Teacher_Report.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
// }
// catch(err){
// console.error(err);
//       alert("Download failed");
// }
// }