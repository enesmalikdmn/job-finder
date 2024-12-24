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
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  if (refresh) {
    try {
      const response = await axios.post(`${API_URL}/refresh`, { refreshToken: refresh });
      const { accessToken } = response.data;

      // Yeni access token'ı localStorage'a kaydet
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw new Error('Failed to refresh token');
    }
  }
  throw new Error('No refresh token available');
};

// Response interceptor - Token yenileme işlemi burada yapılacak
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Eğer 401 hatası alındıysa ve henüz yenileme yapılmadıysa
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Yeniden deneyin
      try {
        const newToken = await refreshToken(); // Yeni token al
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`; // Yeni token'ı başlığa ekle
        return axios(originalRequest); // Yeniden orijinal isteği gönder
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError); // Token yenileme başarısızsa hatayı reddet
      }
    }
    return Promise.reject(error); // Diğer hatalar için
  }
);

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

export const applyToJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/jobs/${jobId}/apply`);
  const jobResponse = await axiosInstance.get(`/jobs/${jobId}`); // İş detaylarını al
  const job = jobResponse.data;

  // Store'a ekle
  const { addJob } = useJobStore.getState();
  addJob(job);

  return response.data;
};

export const withdrawFromJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/jobs/${jobId}/withdraw`);

  // Store'dan kaldır
  const { removeJob } = useJobStore.getState();
  removeJob(jobId);

  return response.data;
};
