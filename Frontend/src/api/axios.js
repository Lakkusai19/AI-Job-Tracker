import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-job-tracker-production-e759.up.railway.app/api/",
});

export default api;