import storage from 'utils/storage';
export default function authInterceptor (config) {
	const isLoggedIn = localStorage['inharmony_authToken'] ? true : false;

	if (isLoggedIn && config.customHeaders) {
		const token = storage.get("inharmony_authToken", null);
		config.headers.common['Authorization'] = `Bearer ${token}`;
	}

	return config;
}