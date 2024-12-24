import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_JOB_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

/**
 * Jobs listesini almak için API çağrısı.
 *
 * @param {number} page Sayfa numarası
 * @param {number} perPage Her sayfadaki öğe sayısı
 * @param {Object} orderBy Sıralama için alan ve yön (field, direction)
 * @param {Object} search Arama için alan ve sorgu (field, query)
 * @returns {Promise} API'den dönen job listesi
 */
export const getJobs = async (
  page: number = 1,
  perPage: number = 20,
  orderBy: { field?: string; direction?: 'asc' | 'desc' } = {},
  search: { field?: string; query?: string } = {}
) => {
  try {
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
  } catch (error: any) {
    console.error('Error fetching jobs:', error.response?.data || error.message);
    throw error;
  }
};
