import axios from "axios";

axios.defaults.withCredentials = true;

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
});

export default api;
