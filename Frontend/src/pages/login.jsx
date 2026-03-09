import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ApiData } from "../services/api";

export default function LoginPage() {
  const [form, setForm] = useState({
    loginType: "teacher",
    teacher_code: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.loginType) {
      setError("Please select Admin or Teacher");
      return;
    }
console.log("hello");
    try {
      const res = await ApiData.post("/login", form);
      const data = res.data;
      if (!res.data) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    } catch (err) {
       if (err.response?.data?.message) {
    setError(err.response.data.message);
  } else {
      setError("Server error");
    }
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* LOGIN TYPE */}
        <div className="flex justify-center gap-6 mb-5">

          <label>
            <input
              type="radio"
              name="loginType"
              value="admin"
              checked={form.loginType === "admin"}
              onChange={handleChange}
            /> Admin
          </label>

          <label>
            <input
              type="radio"
              name="loginType"
              value="teacher"
              checked={form.loginType === "teacher"}
              onChange={handleChange}
            /> Teacher
          </label>

        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
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
            className="w-full p-3 border rounded-lg"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <span
              onClick={() => setShowPass(prev => !prev)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button className="w-full bg-indigo-600 text-white p-3 rounded-lg">
            Login as {form.loginType}
          </button>
        </form>
      </div>
    </div>
  );
}