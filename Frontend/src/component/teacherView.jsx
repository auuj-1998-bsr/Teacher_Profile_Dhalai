import { useEffect, useState } from "react";
import { ApiData } from "../services/api";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TeacherView({ isOpen, onClose, rowdata }) {
    const [loading, setLoading] = useState();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState();
    const [teacherinfo, setTeacherinfo] = useState({
        academic_year: "",
        udise_code: "",
        school_name: "",
        district_name_code: "",
        block_name_code: "",
        school_category_code: "",
        school_type: "",
        teacher_name: "",
        gender: "",
        dob: "",
        teacher_code: "",
        social_category: "",
        hig_qual_acad: "",
        trade: "",
        maths_studied_upto: "",
        science_studied_upto: "",
        english_studied_upto: "",
        soc_study_upto: "",
        language_1: "",
        language_2: "",
        language_3: "",
        doj_service: "",
        appointed_for_level: "",
        sub_taught_1: "",
        sub_taught_2: "",
    });

    useEffect(() => {
        if (isOpen && rowdata?.id) {
            setTeacherinfo(rowdata);
            setPreview(`http://localhost:3400/uploads/${rowdata.image}`);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            if (!file) return;

            if (file.size > 2 * 1024 * 1024) {
                alert("Image must be less than 2MB");
                return;
            }



            setImage(file);

            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            return;
        }

        setTeacherinfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handlesubmit = (event) => {
        event.preventDefault();
        updateTeacherinfo();
        setLoading("loading");
        console.log(teacherinfo);
    }

    const updateTeacherinfo = async () => {
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        Object.entries(teacherinfo).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            const resp = await ApiData.post("/updateTeacherinfo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            const message = resp.data.message;
            console.log(message);
            alert(message);
            setLoading();
            onClose();
        }
        catch (err) {
            console.log("Error", err);
        }
    }
    if (!isOpen) return null;
    return (isOpen && (<div className="bg-white p-6 rounded-xl shadow-lg max-w-6xl w-full h-full">
        <span className="flex justify-end cursor-pointer" title="Close" onClick={onClose}><FontAwesomeIcon icon={faCircleXmark} /></span>
        <h2 className="text-2xl font-semibold text-gray-800">
            Teacher Complete Details Form
        </h2>
        <div> {preview && (<img src={preview} alt="Preview" className="h-30 w-25 object-cover border mt-2 rounded" />)}
            <input type="file" name="image" id="image" accept="image/*" onChange={handleChange} />
            <input type="file" name="aadhar" id="aadhar" accept="image/pdf*" onChange={handleChange} />
        </div>

        <Section title="School Details">
            <Input label="Academic Year" type="number" name="academic_year" value={teacherinfo.academic_year} onChange={handleChange} />
            <Input label="UDISE Code" type="text" minLength={11} maxLength={11} name="udise_code" value={teacherinfo.udise_code} onChange={handleChange} />
            <Input label="School Name" type="text" minLength={3} maxLength={70} name="school_name" value={teacherinfo.school_name} onChange={handleChange} />
            <Input label="District Name & Code" type="text" minLength={4} maxLength={50} name="district_name_code" value={teacherinfo.district_name_code} onChange={handleChange} />
            <Input label="Block Name & Code" type="text" minLength={4} maxLength={50} name="block_name_code" value={teacherinfo.block_name_code} onChange={handleChange} />
            <Input label="School Category Code" type="text" minLength={4} maxLength={50} name="school_category_code" value={teacherinfo.school_category_code} onChange={handleChange} />
            <Input label="School Type" type="text" minLength={4} maxLength={50} name="school_type" value={teacherinfo.school_type} onChange={handleChange} />
        </Section>

        <Section title="Teacher Personal Details">
            <Input label="Teacher Name" type="text" minLength={4} maxLength={50} name="teacher_name" value={teacherinfo.teacher_name} onChange={handleChange} />
            <Input label="Gender" type="text" minLength={4} maxLength={50} name="gender" value={teacherinfo.gender} onChange={handleChange} />
            <Input label="Date of Birth" type="date" name="dob" max="01/01/2002" value={teacherinfo.dob} onChange={handleChange} />
            <Input label="Teacher Code" type="text" name="teacher_code" value={teacherinfo.teacher_code} onChange={handleChange} />
            <Input label="Social Category" type="text" name="social_category" value={teacherinfo.social_category} onChange={handleChange} />

        </Section>

        <Section title="Qualification Details">
            <Input label="Highest Academic Qualification" type="text" minLength={10} maxLength={10} name="hig_qual_acad" value={teacherinfo.hig_qual_acad} onChange={handleChange} />
            <Input label="Trade" name="trade" type="text" maxLength={2} value={teacherinfo.trade} onChange={handleChange} />
        </Section>

        <Section title="Subjects Studied">
            <Input label="Maths Studied Upto" type="text" maxLength={2} name="maths_studied_upto" value={teacherinfo.maths_studied_upto} onChange={handleChange} />
            <Input label="Science Studied Upto" type="text" maxLength={2} name="science_studied_upto" value={teacherinfo.science_studied_upto} onChange={handleChange} />
            <Input label="English Studied Upto" type="text" maxLength={2} name="english_studied_upto" value={teacherinfo.english_studied_upto} onChange={handleChange} />
            <Input label="Social Study Upto" type="text" maxLength={2} name="soc_study_upto" value={teacherinfo.soc_study_upto} onChange={handleChange} />
        </Section>

        <Section title="Languages Known">
            <Input label="Language 1" type="text" maxLength={2} name="language_1" value={teacherinfo.language_1} onChange={handleChange} />
            <Input label="Language 2" type="text" maxLength={2} name="language_2" value={teacherinfo.language_2} onChange={handleChange} />
            <Input label="Language 3" type="text" maxLength={2} name="language_3" value={teacherinfo.language_3} onChange={handleChange} />
        </Section>

        <Section title="Service_Details">
            <Input label="DOJ Service" type="date" name="doj_service" value={teacherinfo.doj_service} onChange={handleChange} />
            <Input label="Appointed For Level" type="number" maxLength={2} name="appointed_for_level" value={teacherinfo.appointed_for_level} onChange={handleChange} />
            <Input label="Subject Taught 1" type="text" maxLength={2} name="sub_taught_1" value={teacherinfo.sub_taught_1} onChange={handleChange} />
            <Input label="Subject Taught 2" type="text" maxLength={2} name="sub_taught_2" value={teacherinfo.sub_taught_2} onChange={handleChange} />
        </Section>
        <div className="text-center pt-4">
            <button className="bg-blue-600 text-white px-10 py-3 rounded-xl hover:bg-blue-700 transition" onClick={handlesubmit}>
                {loading ? "loading..." : "Submit Teacher Details"}
            </button>
        </div>
    </div>)
    );
}
function Section({ title, children }) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-1">
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children}
            </div>
        </div>
    );
}

//Resuseable component 
function Input({ label, value, onChange, name, type, max, min, maxLength, minLength }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                max={max}
                min={min}
                maxLength={maxLength}
                minLength={minLength}
                onChange={onChange}
                inputMode="numeric"
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={label}
            />
        </div>
    );
}