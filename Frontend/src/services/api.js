import axios from "axios";
export const ApiData = axios.create({
   baseURL:"https://teacher-profile-dhalai.onrender.com",
  // baseURL: import.meta.env.VITE_API_URL,
  timeout: 120000,
  withCredentials: true,
});


