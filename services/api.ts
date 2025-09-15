import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000", 
  withCredentials: true, // needed for session-based auth
});

export default api;
