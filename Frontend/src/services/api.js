// import axios from "axios";

//  export const ApiData=axios.create({
//     baseURL:"http://localhost:3400",
//     timeout: 120000,
// })


import axios from "axios";

export const ApiData = axios.create({
   baseURL:"https://teacher-profile-dhalai.onrender.com",
  timeout: 120000,
});


// const baseURL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:3400"
//     : "https://teacher-profile-dhalai.onrender.com";

// export const ApiData = axios.create({
//   baseURL,
// });