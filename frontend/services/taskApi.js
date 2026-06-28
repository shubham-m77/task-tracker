import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTasks = () => api.get("/api/tasks");

export const createTask = (data) => api.post("/api/tasks", data);

export const updateTask = (id, data) =>
  api.put(`/api/tasks/${id}`, data);

export const deleteTask = (id) =>
  api.delete(`/api/tasks/${id}`);

export default api;