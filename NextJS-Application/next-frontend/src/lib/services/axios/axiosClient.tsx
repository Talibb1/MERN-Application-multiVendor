import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

axiosClient.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json'; 
  }
  return config;
});

export default axiosClient;
