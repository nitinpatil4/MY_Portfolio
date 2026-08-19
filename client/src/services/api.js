import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Attach admin JWT token (if present) to every request
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('admin');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const sendContactMessage = (data) => api.post('/contact', data);
export const getMessages = () => api.get('/contact');
export const deleteMessage = (id) => api.delete(`/contact/${id}`);
export const loginAdmin = (data) => api.post('/auth/login', data);

export default api;
