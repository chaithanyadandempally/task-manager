import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-q7lx.onrender.com/api"
});

export default API;