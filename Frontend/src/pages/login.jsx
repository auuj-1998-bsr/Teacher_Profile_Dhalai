import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ApiData } from "../services/api";


export default function LoginPage() {
  const [form, setForm] = useState({
    loginType: "",
    teacher_code: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.loginType) {
      setError("Please select Admin or Teacher");
      return;
    }
    try {
      const res = await ApiData.post("/login", form);
      const data = res.data;

      if (!res.data) {
        setError(data.message);
        setLoading(false);
        console.log(data);
      } else {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err)
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {

        setError("Server error");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">

      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">

        <h3 className="text-2xl font-bold text-center text-gray-700 py-8">
          🎓 School Teacher Management
        </h3>
        <div className="flex justify-center gap-6 mb-5">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="loginType"
              disabled
              value="admin"
              checked={form.loginType === "admin"}
              onChange={handleChange}
            />
            Admin
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="loginType"
              value="teacher"
              checked={form.loginType === "teacher"}
              onChange={handleChange}
            />
            Teacher
          </label>

        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="teacher_code"
            placeholder={form.loginType === "admin" ? "Admin ID" : "Teacher Code"}
            value={form.teacher_code}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />

            <span
              onClick={() => setShowPass(prev => !prev)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition">
            {loading ? "Login..." : `Login as ${form.loginType}`}
          </button>
        </form>
        <p className="text-center text-sm mt-5 text-black/70">
          Secure Login 🔐
        </p>
      </div>
    </div>
  );
}