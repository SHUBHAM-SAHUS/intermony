import axios, {API_VIRSION} from 'config';

export const getCouponCodes = (params) =>  axios.get(`${API_VIRSION}/admin/coupon`, {params});

export const getCouponCodesDynamic = (params) =>  axios.get(`${API_VIRSION}/admin/coupon/dynamic`, {params});

export const createCouponCode = (body)=>  axios.post(`${API_VIRSION}/admin/coupon`, body);

export const createCouponCodeDynamic = (body)=>  axios.post(`${API_VIRSION}/admin/coupon/dynamic`, body);

export const toggleCouponCode = (body, id) => axios.put(`${API_VIRSION}/admin/coupon/${id}/toggle`, body);