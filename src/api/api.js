import axios from "axios";

// Backend status tracking for cold start handling
let backendStatus = 'unknown'; // 'unknown' | 'waking' | 'ready' | 'error'
const statusListeners = new Set();

export const getBackendStatus = () => backendStatus;

export const subscribeToBackendStatus = (callback) => {
  statusListeners.add(callback);
  return () => statusListeners.delete(callback);
};

const setBackendStatus = (status) => {
  backendStatus = status;
  statusListeners.forEach(cb => cb(status));
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000, // 60 second timeout for cold starts
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Retry logic with exponential backoff for cold starts
api.interceptors.response.use(
  (response) => {
    // Backend responded successfully
    if (backendStatus !== 'ready') {
      setBackendStatus('ready');
    }
    return response;
  },
  async (error) => {
    const config = error.config;

    // Only retry on network errors or 5xx (server starting up scenarios)
    const shouldRetry = !error.response || (error.response.status >= 500 && error.response.status < 600);

    if (!shouldRetry) {
      return Promise.reject(error);
    }

    // Initialize retry count
    config.__retryCount = config.__retryCount || 0;
    const maxRetries = 8;

    if (config.__retryCount >= maxRetries) {
      setBackendStatus('error');
      return Promise.reject(error);
    }

    config.__retryCount += 1;

    // Set status to waking on first retry
    if (config.__retryCount === 1 && backendStatus !== 'waking') {
      setBackendStatus('waking');
    }

    // Exponential backoff: 1s, 2s, 4s, 8s, 8s, 8s, 8s, 8s (max 8s)
    const delay = Math.min(1000 * Math.pow(2, config.__retryCount - 1), 8000);

    console.log(`Backend cold start - retry ${config.__retryCount}/${maxRetries} in ${delay}ms...`);

    await new Promise(resolve => setTimeout(resolve, delay));

    return api(config);
  }
);

// Wake up the backend by pinging the health endpoint
export const wakeUpBackend = async () => {
  if (backendStatus === 'ready') return true;

  setBackendStatus('waking');

  try {
    await api.get('/health');
    setBackendStatus('ready');
    return true;
  } catch (error) {
    // The retry interceptor will handle retries
    // If we get here after retries, it failed
    if (backendStatus !== 'ready') {
      setBackendStatus('error');
    }
    return backendStatus === 'ready';
  }
};

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
