import apiClient from './apiClient';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password
    });
    
    if (response.data && response.data.accessToken) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.accessToken);
      // Create user object from response data
      const user = {
        id: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email, password, fullName) => {
  try {
    const response = await apiClient.post('/api/auth/register', {
      email,
      password,
      fullName
    });
    
    if (response.data && response.data.accessToken) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.accessToken);
      // Create user object from response data
      const user = {
        id: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};