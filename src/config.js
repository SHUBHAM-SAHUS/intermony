import axios from 'axios';
import storage from 'utils/storage';
import successHandler from "./utils/interceptors/successHandler";
import errorHandler from "./utils/interceptors/errorHandler";
import * as commonService from "utils/CommonService";
export const BASE_URL = () => {
  let url;
  if (process.env.REACT_APP_ENV === 'development') {
    url = 'https://stage-api.iaminharmony.com'
  }
  if (process.env.REACT_APP_ENV === 'staging') {
    url = 'https://stage-api.iaminharmony.com'
  }
  if (process.env.REACT_APP_ENV === 'production') {
    console.log("production if");
    url = 'https://api.iaminharmony.com'
  }
  return url;
};
export const API_VIRSION = "/v1";

export const Durations = [{value: "lessThan15", text: "< 15 mins"}, {value: "15to30", text: "15 - 30 mins"}, {value: "greaterThan30", text: "> 30 mins"}];

const instance = axios.create({
  baseURL: BASE_URL()
});
  instance.interceptors.request.use(config => {
  // show loader
  commonService.isLoading.onNext(true);
  return config;
});
instance.interceptors.response.use(config => {
  // hide loader
  commonService.isLoading.onNext(false);
  return config;
});
const token = storage.get("inharmony_authToken", null);
if (token) instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
instance.interceptors.response.use(
        response => successHandler(response),
        error => errorHandler(error)
);
export default instance;