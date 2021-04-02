import axios, {API_VIRSION } from 'config';

export const getUserList = (params) => axios.get(`${API_VIRSION}/admin/user`, {params});

export const createUsers = (body) => axios.post(`${API_VIRSION}/admin/user`,  body);

export const filterUsers = (params) => axios.get(`${API_VIRSION}/admin/user`, {
    params
  });

export const updateLifetime = (body, id) => axios.put(`${API_VIRSION}/admin/user/${id}/lifetime`,  body);

export const deleteUser = (id) => axios.delete(`${API_VIRSION}/admin/user/${id}`);

export const resendPassword = (params) => axios.post(`${API_VIRSION}/auth/forgotpassword`,  params);
