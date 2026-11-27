import axios from 'axios';

// Backend API URL
const VITE_API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'https://api.akconstructionbyraju.com/api';

// Create an instance
const api = axios.create({
  baseURL: VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to protected routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* ----------------------------------------------------------------
   WARM-UP PING — silent GET so the free-tier backend wakes up
   ---------------------------------------------------------------- */
export const warmUpBackend = () => {
  api.get('/projects').catch(() => {});
};

/* ----------------------------------------------------------------
   SNAPSHOT / CACHE LAYER  (static-first, stale-while-revalidate)
   ---------------------------------------------------------------- */
const SNAPSHOT_KEY = 'ak_snapshot';
const SNAPSHOT_TS_KEY = 'ak_snapshot_ts';
const SNAPSHOT_TTL = 5 * 60 * 1000; // 5 min

export const getCachedSnapshot = () => {
  try {
    const raw = localStorage.getItem(SNAPSHOT_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
};

const saveSnapshot = (data) => {
  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(data));
    localStorage.setItem(SNAPSHOT_TS_KEY, String(Date.now()));
  } catch { /* quota exceeded — degrade gracefully */ }
};

export const isSnapshotStale = () => {
  const ts = localStorage.getItem(SNAPSHOT_TS_KEY);
  if (!ts) return true;
  return Date.now() - Number(ts) > SNAPSHOT_TTL;
};

/**
 * Fetch all public data with SWR pattern.
 * Returns cached data instantly, then refreshes in the background.
 */
export const fetchPublicData = async () => {
  const [projRes, memRes, testRes] = await Promise.all([
    fetchProjects(),
    fetchMembers(),
    fetchTestimonials(),
  ]);
  const data = {
    projects: projRes.data || [],
    members: memRes.data || [],
    testimonials: testRes.data || [],
  };
  saveSnapshot(data);
  return data;
};

/* ----------------------------------------------------------------
   AUTH
   ---------------------------------------------------------------- */
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

export const submitNewPassword = async (email, newPassword, resetToken) => {
  const res = await api.post('/auth/reset-password', { email, newPassword, resetToken });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

/* ----------------------------------------------------------------
   PROJECTS
   ---------------------------------------------------------------- */
export const fetchProjects = async () => {
  const res = await api.get('/projects');
  return res.data;
};

export const fetchProject = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const addProject = async (projectData) => {
  const formData = new FormData();
  Object.keys(projectData).forEach((key) => {
    if (projectData[key] != null) formData.append(key, projectData[key]);
  });
  return await api.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateProject = async (id, projectData) => {
  const formData = new FormData();
  Object.keys(projectData).forEach((key) => {
    if (projectData[key] != null) formData.append(key, projectData[key]);
  });
  return await api.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProject = async (id) => {
  return await api.delete(`/projects/${id}`);
};

export const addGalleryImages = async (id, files) => {
  const formData = new FormData();
  files.forEach((f) => formData.append('images', f));
  return await api.post(`/projects/${id}/gallery`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const removeGalleryImage = async (projectId, publicId) => {
  return await api.delete(`/projects/${projectId}/gallery/${encodeURIComponent(publicId)}`);
};

/* ----------------------------------------------------------------
   TESTIMONIALS
   ---------------------------------------------------------------- */
export const fetchTestimonials = async () => {
  const res = await api.get('/testimonials');
  return res.data;
};

export const addTestimonial = async (testimonialData) => {
  const formData = new FormData();
  Object.keys(testimonialData).forEach((key) => {
    if (testimonialData[key]) formData.append(key, testimonialData[key]);
  });
  return await api.post('/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteTestimonial = async (id) => {
  return await api.delete(`/testimonials/${id}`);
};

/* ----------------------------------------------------------------
   MEMBERS
   ---------------------------------------------------------------- */
export const fetchMembers = async () => {
  const res = await api.get('/members');
  return res.data;
};

export const addMember = async (memberData) => {
  const formData = new FormData();
  Object.keys(memberData).forEach((key) => {
    if (memberData[key] != null) formData.append(key, memberData[key]);
  });
  return await api.post('/members', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteMember = async (id) => {
  return await api.delete(`/members/${id}`);
};

/* ----------------------------------------------------------------
   ENQUIRIES
   ---------------------------------------------------------------- */
export const submitEnquiry = async (data) => {
  // data should include: name, phone, service, location, message
  // and the honeypot field "company" (should be empty)
  const res = await api.post('/enquiries', data);
  return res.data;
};

export const fetchEnquiries = async () => {
  const res = await api.get('/enquiries');
  return res.data;
};

export const updateEnquiryStatus = async (id, status) => {
  const res = await api.put(`/enquiries/${id}`, { status });
  return res.data;
};

export const deleteEnquiry = async (id) => {
  return await api.delete(`/enquiries/${id}`);
};

/* ----------------------------------------------------------------
   SNAPSHOT (admin: generate snapshot for static-first)
   ---------------------------------------------------------------- */
export const generateSnapshot = async () => {
  const res = await api.post('/snapshot');
  return res.data;
};

export default api;
