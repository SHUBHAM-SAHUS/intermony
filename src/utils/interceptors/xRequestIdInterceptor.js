import storage from '../storage';

export function xRequestIdRequest (config) {
	const requestId = storage.get('requestId');

	if (requestId && config.customHeaders) {
		config.headers.common['X-Request-Id'] = requestId;
	}

	return config;
}

export function xRequestIdResponse (response) {
	const requestId = response.headers['x-request-id'];

	if (requestId && response.config.requestId !== requestId) {
		try {
			storage.set('requestId', requestId);
		} catch (e) {
			console.log('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.')
		}
	}

	return response;
}