import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ======= SKILLS =======
export const getSkills = () => api.get("/skills");
export const addSkill = (skill) => api.post("/skills", skill);
export const updateSkill = (id, skill) => api.put(`/skills/${id}`, skill);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// ======= PROJECTS =======
export const getProjects = () => api.get("/projects");
export const addProject = (project) => api.post("/projects", project);
export const updateProject = (id, project) => api.put(`/projects/${id}`, project);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// ======= RESUME =======
export const getResumeData = () => api.get("/resume");
export const saveResume = (resumeData) => api.post("/resume", resumeData);
export const updateResume = (id, resumeData) => api.put(`/resume/${id}`, resumeData);
export const deleteResume = (id) => api.delete(`/resume/${id}`);

// ======= RESUME FILE DOWNLOAD =======
export const downloadResumeFile = () =>
  api.get("/download-resume", {
    responseType: "blob",
  });

// ======= CONTACT FORM =======
export const sendContactForm = (formData) => api.post("/contact", formData);

// ======= ADMIN AUTH =======
export const adminLogin = (credentials) => api.post("/login", credentials);

export default api;
