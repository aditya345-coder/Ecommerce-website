import apiClient from './apiClient';

export const getProfile = async () => {
  const response = await apiClient.get('/api/users/me');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await apiClient.put('/api/users/me', data);
  return response.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  const response = await apiClient.post('/api/users/change-password', {
    oldPassword,
    newPassword,
  });
  return response.data;
};
