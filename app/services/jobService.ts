import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_JOB_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

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
  try {
    const token = localStorage.getItem('accessToken');
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

    const response = await axiosInstance.get('/jobs', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching jobs:', error.response?.data || error.message);
    throw error;
  }
};
