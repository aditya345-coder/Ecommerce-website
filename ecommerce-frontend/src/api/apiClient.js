import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Parse JSON strings in responses
apiClient.interceptors.response.use((response) => {
  // If response.data is a string that looks like JSON, parse it
  if (typeof response.data === 'string' && response.data.trim().startsWith('{')) {
    try {
      response.data = JSON.parse(response.data);
    } catch (e) {
      console.error('Failed to parse response data as JSON:', e);
    }
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;