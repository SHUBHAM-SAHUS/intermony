import axios from 'config';
import {API_VIRSION} from "config";
// temporary DASHBOARD api
export const getDashboardRecords = (params) => axios.get(`${API_VIRSION}/admin/dashboard/show`, { params});

export const getSummery = (params) => axios.get(`${API_VIRSION}/admin/analytics/summary`, { params});

export const playedAnalytics = (params) => axios.get(`${API_VIRSION}/admin/analytics/played`, { params});
export const downloadsAnalytics = (params) => axios.get(`${API_VIRSION}/admin/analytics/downloads`, { params});
export const favouritesAnalytics = (params) => axios.get(`${API_VIRSION}/admin/analytics/favourites`, { params});

export const userPlayedPost = (params) => axios.get(`${API_VIRSION}/admin/analytics/user/played`, { params});