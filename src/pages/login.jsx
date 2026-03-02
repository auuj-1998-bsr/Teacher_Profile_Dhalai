import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ApiData } from "../services/api";

export default function LoginPage() {
  const [form, setForm] = useState({
    teacher_code: "",
    password: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await ApiData.post("/login", {
        form
      });
      const data = await res.data;
      console.log(data);

      if (!res.data) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    } catch (err) {
      setError("Server error");
    }
  }
  console.log(form);
  console.log("hello")

  return (
    <div className="min-h-screen bg-gradient from-indigo-500 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Teacher Login Portal
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="teacher_code"
            placeholder="Teacher Code"
            value={form.teacher_code}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}