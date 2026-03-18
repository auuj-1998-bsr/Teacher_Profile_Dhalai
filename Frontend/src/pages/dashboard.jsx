import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ApiData } from "../services/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
const[count,setCount]=useState(0);
const [maleCount,setMaleCount]=useState();
const [femaleCount,setFemaleCount]=useState();
const [primaryCount,setPrimaryCount]=useState();
const [upperPrimary,setUpperPrimary]=useState();
const [secondary,setSecondary]=useState();
const [higherSecondary,HigherSecondary]=useState();

  useEffect(() => {
    getData()
  }, []);
  const getData = async () => {
    try {
      const responce = await ApiData.post("/dashboard");
      setCount(responce.data.countData.total_records);
      setMaleCount(responce.data.countData.male_Count);
      setFemaleCount(responce.data.countData.female_Count);
      setPrimaryCount(responce.data.countData.primary);
      setUpperPrimary(responce.data.countData.upper_primary);
      setSecondary(responce.data.secondary);
      HigherSecondary(responce.data.countData.higher_secondary);

    }
    catch (err) {
      console.log(err);
    }
  }
  const genderData = [
    { name: "Male", value: Number(maleCount) },
    { name: "Female", value: Number(femaleCount) }
  ];

  const schoolData = [
    { name: "Primary", count: Number(primaryCount) },
    { name: "Upper Primary", count: Number(upperPrimary) },
    { name: "Secondary", count: Number(secondary) },
    { name: "Higher Secondary", count: Number(higherSecondary) }
  ];

  const COLORS = ["#0088FE", "#FF69B4"];

  return (
    <div className="p-6">

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-400 text-white p-4 rounded-xl shadow">
          <h2>Male</h2>
          <p className="text-2xl font-bold">{maleCount}</p>
        </div>
        <div className="bg-pink-400 text-white p-4 rounded-xl shadow">
          <h2>Female</h2>
          <p className="text-2xl font-bold">{femaleCount}</p>
        </div>
        <div className="bg-green-400 text-white p-4 rounded-xl shadow">
          <h2>Total Teachers</h2>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className="bg-purple-400 text-white p-4 rounded-xl shadow">
          <h2>Schools</h2>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">Gender Distribution</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={genderData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {genderData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="mb-4 font-semibold">School Type</h2>
          <BarChart width={400} height={300} data={schoolData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" />
          </BarChart>
        </div>

      </div>
    </div>
  );
}