import axios from 'axios';

// Backend API URL
const VITE_API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://ak-construction-backend.onrender.com/api';

// Create an instance
const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to attach JWT token to protected routes
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Auth
export const loginAdmin = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const requestPasswordReset = async (email) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

export const verifyResetOtp = async (email, otp) => {
  const res = await api.post('/auth/verify-otp', { email, otp });
  return res.data;
};

export const submitNewPassword = async (email, newPassword) => {
  const res = await api.post('/auth/reset-password', { email, newPassword });
  return res.data;
};

// Projects
export const fetchProjects = async () => {
  const res = await api.get('/projects');
  return res.data;
};

export const addProject = async (projectData) => {
  const formData = new FormData();
  Object.keys(projectData).forEach(key => {
    formData.append(key, projectData[key]);
  });
  return await api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteProject = async (id) => {
  return await api.delete(`/projects/${id}`);
};

// Testimonials
export const fetchTestimonials = async () => {
  const res = await api.get('/testimonials');
  return res.data;
};

export const addTestimonial = async (testimonialData) => {
  const formData = new FormData();
  Object.keys(testimonialData).forEach(key => {
    if (testimonialData[key]) {
      formData.append(key, testimonialData[key]);
    }
  });
  return await api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteTestimonial = async (id) => {
  return await api.delete(`/testimonials/${id}`);
};

// Members
export const fetchMembers = async () => {
  const res = await api.get('/members');
  return res.data;
};

export const addMember = async (memberData) => {
  const formData = new FormData();
  Object.keys(memberData).forEach(key => {
    formData.append(key, memberData[key]);
  });
  return await api.post('/members', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteMember = async (id) => {
  return await api.delete(`/members/${id}`);
};
