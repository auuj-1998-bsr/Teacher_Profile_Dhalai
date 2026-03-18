import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ApiData } from "../services/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
const[count,setCount]=useState(0);
const [maleCount,setMaleCount]=useState(700);
const [femaleCount,setFemaleCount]=useState(453);
const [primaryCount,setPrimaryCount]=useState(233);
const [upperPrimary,setUpperPrimary]=useState(345);
const [secondary,setSecondary]=useState(345);
const [higherSecondary,HigherSecondary]=useState(24);

  useEffect(() => {
    getData()
  }, []);
  const getData = async () => {
    try {
      const responce = await ApiData.post("/dashboard");
      console.log(responce);
      console.log("hello");
      setCount(responce.data.total_records);
      setMaleCount(responce.data.male_Count);
      setFemaleCount(responce.data.female_Count);
      setPrimaryCount(responce.data.primary);
      setUpperPrimary(responce.data.upper_primary);
      setSecondary(responce.data.secondary);
      HigherSecondary(responce.data.higher_secondary);

    }
    catch (err) {
      console.log(err);
    }
  }
  const genderData = [
    { name: "Male", value: maleCount },
    { name: "Female", value: femaleCount }
  ];

  const schoolData = [
    { name: "Primary", count: primaryCount },
    { name: "Upper Primary", count: upperPrimary },
    { name: "Secondary", count: secondary },
    { name: "Higher Secondary", count: higherSecondary }
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
          <p className="text-2xl font-bold">145</p>
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