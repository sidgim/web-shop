import axios from 'axios';

const producApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_API_URL,
});

//interceptor
producApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { producApi };
