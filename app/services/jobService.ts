import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_JOB_API_BASE_URL;

// Axios instance oluşturma ve interceptors ile token ekleme
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Authorization token ekler
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Hata loglama
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Jobs listesini almak için API çağrısı.
 *
 * @param {Object} options API parametreleri (page, perPage, orderBy, search)
 * @returns {Promise} API'den dönen job listesi
 */
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
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

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

/**
 * İşe başvurmak için API çağrısı.
 *
 * @param {string} jobId Başvurulacak işin ID'si
 * @returns {Promise} API yanıtı
 */
export const applyToJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/jobs/${jobId}/apply`);
  return response.data;
};


export const withdrawFromJob = async (jobId: string) => {
  try {
    const response = await axiosInstance.post(`/jobs/${jobId}/withdraw`);
    return response.data;
  } catch (error: any) {
    console.error('Error withdrawing from job:', error.response?.data || error.message);
    throw error;
  }
};
