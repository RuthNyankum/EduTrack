// import axios from "axios";

// export const api = axios.create({
//     baseURL : import.meta.env.VITE_API_URL,
//     withCredentials:true,

// })

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json", // ✅ This is critical!
  },
  withCredentials: true,
});
