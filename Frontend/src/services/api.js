import axios from "axios";

 export const ApiData=axios.create({
    baseURL:"http://localhost:3400",
    timeout: 120000,
})