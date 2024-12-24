import axios from 'axios';
import { useJobStore } from '../../store/useJobStore';

const API_URL = process.env.NEXT_PUBLIC_JOB_API_BASE_URL;

// Axios instance oluşturma
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authorization token ekleme
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// İş listesi API çağrısı
export const getJobs = async ({
  page = 1,
  perPage = 20,
  orderBy = {},
  search = {},
}: {
  page?: number;
  perPage?: number;
  orderBy?: { field?: string; direction?: 'asc' | 'desc' };
  search?: { field?: string; query?: string };
}) => {
  const params: Record<string, string | number> = { page, perPage };

  if (orderBy.field && orderBy.direction) {
    params[`orderBy[field]`] = orderBy.field;
    params[`orderBy[direction]`] = orderBy.direction;
  }

  if (search.field && search.query) {
    params[`search[field]`] = search.field;
    params[`search[query]`] = search.query;
  }

  const response = await axiosInstance.get('/jobs', { params });
  return response.data;
};

// İş başvurusu yap
export const applyToJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/jobs/${jobId}/apply`);
  const jobResponse = await axiosInstance.get(`/jobs/${jobId}`); // İş detaylarını al
  const job = jobResponse.data;

  // Store'a ekle
  const { addJob } = useJobStore.getState();
  addJob(job);

  return response.data;
};

// İş başvurusunu geri çek
export const withdrawFromJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/jobs/${jobId}/withdraw`);

  // Store'dan kaldır
  const { removeJob } = useJobStore.getState();
  removeJob(jobId);

  return response.data;
};
