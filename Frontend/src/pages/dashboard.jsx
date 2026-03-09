import { ApiData } from "../services/api";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faFilePdf, faFileExcel,faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TeacherView } from "../component/teacherView";


function Dashboard() {
    const [page, setPage] = useState(1);
    const [ProfileData, setProfieData] = useState([]);
    const [udiseCode, setUdiseCode] = useState();
    const [gender, setGender] = useState();
    const [count, setCount] = useState();
    const [doj, setDoj] = useState();
    const [schooltype, setSchooltype] = useState()
    const [block, setBlock] = useState("");
    const [pdfloading, setPdfLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowdata, setRowdata] = useState();
    const [spin,setSpin]=useState("");
    useEffect(() => {
        getData();
    }, [page, gender, schooltype, doj, block, udiseCode])

    const getData = async () => {
        try {
            const response = await ApiData.post("/profile", {
                page: page,
                limit: 10,
                udiseCode: udiseCode,
                gender: gender,
                schooltype: schooltype,
                doj: doj,
                block: block,
            })
            setProfieData(response.data.teacherProfileData);
            setCount(response.data.totalCount);
        }
        catch (err) {
            console.error(err.message);
        }
    }
    //pdf
    const handleTeacherReports = async (type) => {
        setPdfLoading(true);
        try {
            const response = await ApiData.post("/profile",
                {
                    page: page,
                    limit: 10,
                    gender: gender,
                    schooltype: schooltype,
                    doj: doj,
                    block: block,
                    download: type,
                },
                { responseType: "blob" }
            )
            if (response.data.type === "application/json") {
                const text = await response.data.text();
                console.error("Backend error:", text);
                alert("Server error while generating PDF");
                return;
            }
            const mimeType = type === "pdf" ? "application/pdf" : "text/csv";
            const fileName = type === "pdf" ? "teacher_data.pdf" : "teacher_data.csv";
            const blob = new Blob([response.data], { type: mimeType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
        catch (err) {
            console.error(err);
            alert("Download failed");
        }
        finally {
            setPdfLoading(false);
            setSpin("")
        }
    }
    const handleReset = () => {
        setPage(1);
        setSchooltype("0");
        setDoj("0");
        setGender("0");
        setBlock("0");
        setUdiseCode("0");
        console.log("reset");    
    }

    const handleView = (data) => {
        setRowdata(data);
        setIsModalOpen(prev=>!prev);
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Teacher Profile Info
                    </h1>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-2 ">
                <select className="border rounded px-3 py-2 text-sm " value={doj} onChange={(e) => setDoj(e.target.value)}>
                    <option value="0">DOJ Teacher</option>
                    <option value="2020">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
                <select className="border rounded px-3 py-2 text-sm" value={udiseCode} onChange={(e) => setUdiseCode(e.target.value)}>
                    <option value="0">UDISE Code</option>
                    <option value="16030302001">16030302001</option>
                    <option value="16030300904">16030300904</option>
                    <option value="16030102504">16030102504</option>
                    <option value="16030105602">16030105602</option>
                    <option value="16030301608">16030301608</option>
                </select>
                <select className="border rounded px-3 py-2 text-sm" value={block} onChange={(e) => setBlock(e.target.value)}>
                    <option value="0">Block</option>
                    <option value="MANU">MANU</option>
                    <option value="DURGACHOWMUHANI">DURGACHOWMUHANI</option>
                    <option value="AMBASSA">AMBASSA</option>
                    <option value="SALEMA">SALEMA</option>
                    <option value="CHAWMANU">CHAWMANU</option>
                    <option value="GANGANAGAR">GANGANAGAR</option>
                    <option value="DUMBURNAGAR">DUMBURNAGAR</option>
                    <option value="SHILLONG">SHILLONG</option>
                </select>
                <select className="border rounded px-3 py-2 text-sm" value="0" onChange={(e) => setGender(e.target.value)}>
                    <option value="0">Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
                <select className="border rounded px-3 py-2 text-sm" value={schooltype} onChange={(e) => setSchooltype(e.target.value)}>
                    <option value="0">School Type</option>
                    <option value="1">Primary School</option>
                    <option value="2">Upper primary School</option>
                    <option value="6">Secondary School</option>
                    <option value="3">Higher Secondary School</option>
                </select>
                <h1 className="pl-2 px-3 py-2 text-sm">TotalTeacher:{count}</h1>
                <button onClick={!pdfloading ?()=>{handleReset();setSpin("reset")}:null} title="reset" className={`hover:text-blue-500 transition pl-0 pr-0 px-3 py-2 cursor-pointer 
               ${pdfloading ? "animate-spin text-gray-400" : "hover:text-blue-500"}`}>
                    <FontAwesomeIcon icon={faArrowRotateLeft} /></button>
                <h1 title="Download_Pdf" onClick={!pdfloading ? () => handleTeacherReports("pdf")&& setSpin("pdf") : null}
                    className="pl-2 pr-0 px-3 py-2 cursor-pointer transition">
                        <FontAwesomeIcon icon={spin==="pdf"?faSpinner:faFilePdf} /></h1>
                <h1 title="Download_csv" onClick={!pdfloading ? () => handleTeacherReports("excel")&& setSpin("excel") : null}
                    className="pl-2 pr-0 px-3 py-2 cursor-pointer transition" >
                        <FontAwesomeIcon icon={spin==="excel"?faSpinner:faFileExcel} /></h1>
            </div>
            <TeacherView
                rowdata={rowdata}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            {/* <th className="px-4 py-3 text-left">Academic Year</th> */}
                            <th className="px-4 py-3 text-left">Profile</th>
                            <th className="px-4 py-3 text-left">UDISE Code</th>
                            <th className="px-4 py-3 text-left">School Name</th>
                            <th className="px-4 py-3 text-left">Teacher Name</th>
                            <th className="px-4 py-3 text-left">Gender</th>
                            <th className="px-4 py-3 text-left">Doj Service</th>
                            {/* <th className="px-4 py-3 text-left">Subjects</th> */}
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ProfileData.map((teacherData, index) => (
                            <tr key={index} className="border-t hover:bg-gray-300">
                                <td className="pl-1"><img src={`${import.meta.env.VITE_API_URL}/uploads/${teacherData.image}`} alt="teacher" className="size-12 rounded-full object-cover"/></td>
                                <td className="px-4 py-3">{teacherData.udise_code}</td>
                                <td className="px-4 py-3">{teacherData.school_name}</td>
                                <td className="px-4 py-3 font-medium">{teacherData.teacher_name}</td>
                                <td className="px-4 py-3">{teacherData.gender === 1 ? "Male" : "Feamle"}</td>
                                <td className="px-4 py-3">{teacherData.doj_service}</td>
                                <td className="px-4 py-3 text-blue-600 cursor-pointer" onClick={() => handleView(teacherData)}>View</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end gap-2">
                <button className="px-3 py-1 border rounded" onClick={() => {
                    if (page > 1) { setPage(page - 1) }
                    else { alert("enter next button") }
                }}>Prev</button>
                <button className="px-3 py-1 border rounded bg-blue-600 text-white">
                    {page}
                </button>
                <button className="px-3 py-1 border rounded" onClick={() => {
                    if (page < count / 10) { setPage(page + 1) }
                    else alert("previous page click")
                }}>Next</button>
            </div>
        </div>
    );
}
export default Dashboard;
