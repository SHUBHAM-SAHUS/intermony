import axios, {API_VIRSION } from 'config';

export const getHarmonyList = (params) => axios.get(`${API_VIRSION}/admin/post`, {params});

export const getHarmony = (id) => axios.get(`${API_VIRSION}/admin/post/${id}`);

export const deleteHarmony = (id) => axios.delete(`${API_VIRSION}/admin/post/${id}`);

export const createHarmony = (body) => axios.post(`${API_VIRSION}/admin/post`, body);

export const config = (body) => axios.patch(`${API_VIRSION}/presign_url`, body);

export const getConfigList = (params) => axios.get(`${API_VIRSION}/config`, {params});

export const updateHarmony = (body, id) => axios.put(`${API_VIRSION}/admin/post/${id}`, body);

export const activateHarmony = (id) => axios.put(`${API_VIRSION}/admin/post/${id}/activate`);

export const deactivateHarmony = (id) => axios.put(`${API_VIRSION}/admin/post/${id}/deactivate`);

export const favouriteHarmony = (body) => axios.get(`${API_VIRSION}/admin/harmony/favourite`);

export const addFeaturedPost = (body, id) => axios.put(`${API_VIRSION}/admin/post/${id}/featured`, body);

export const filterPosts = (params) => axios.get(`${API_VIRSION}/admin/post`, {
    params
  });
