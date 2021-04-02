import axios from 'config';
import {API_VIRSION } from "config"
// temporary user api
export const login = (body) => axios.post(`${API_VIRSION}/auth/login`, body);
export const signup = (body) => axios.post(`${API_VIRSION}/auth/signup`, body);
export const forgotPassword = (body) =>   axios.put(`${API_VIRSION}/auth/password/forgot`, body);
export const refreshToken = () =>  axios.post(`${API_VIRSION}/auth/refreshtoken`);
export const resetPassword = (body) => axios.put(`${API_VIRSION}/auth/password/reset`, body);
