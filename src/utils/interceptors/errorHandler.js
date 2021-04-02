import axios from 'axios';
import Axios from 'config';
import storage from 'utils/storage';
import * as commonService from '../CommonService.js';
import store from 'redux/store/store';
import * as actions from "redux/actions/AuthActions";

const handleAuthentication = async (error) => {
	const config = error.config;
	const token = storage.get("inharmony_refresh_token", null);
	Axios.defaults.headers.common["x-refreshtoken"] = token;
	return await store.dispatch(actions.refreshToken()).then(res => {
		config.headers.Authorization = `Bearer ${res.value.token}`;
		return Axios.request(config)
	});
};
const resetLoginData = () => {
	localStorage.clear();
	window.location.reload();
}
export default function errorHandler (error) {
	//hide loader
	commonService.isLoading.onNext(false);
	if (axios.isCancel(error)) {
		return Promise.reject(error);
	}
	if (error.message === "Network Error") {
		commonService.forError('Error connecting server. Please check your internet connection.', 'Error');
		return Promise.reject(error.message);
	}
	const message  = error.response ? error.response.data.message : 'Seems like something went wrong!' ;
	switch (error.response.status) {
		case 400:
			if (message === "jwt expired") handleAuthentication(message);
			else if (message === "Unauthorized") resetLoginData();
			else commonService.forError(message, 'Warning');
			break;
		case 401:
			handleAuthentication(message);
			console.log('unauthorized, logging out ...');
			break;
		case 500:
			commonService.forError( message, 'Error');
			break;
		case 504:
			commonService.forError('Sorry, could not access the external resource to refine the data for your request, please try again later!' , 'Error');
			break;
		case 700:
			commonService.forError(message , 'Error');
			break;
		default:
			commonService.forError(message ? message : 'something went wrong' , 'Error');
			break;
	}
	return Promise.reject(error.response);
}
