import axios, {AxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../utility/environment';
import {STORAGE_SERVICES} from '../type';
import {storageServices} from '../utility/storageServices';

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

const apiClientAuth = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClientAuth.interceptors.request.use(
	(config) => {
		const token = storageServices.get(STORAGE_SERVICES.LOCAL, 'authToken');
		if (token) {
			config.headers = config.headers || {};
			if (typeof config.headers.set === 'function') {
				config.headers.set('Authorization', `${token}`);
			} else {
				config.headers['Authorization'] = `${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export const apiUnAuth = {
	get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		try {
			const response = await apiClient.get<T>(url, config);
			return response.data;
		} catch (error) {
			console.error('API GET error (unauth):', error);
			throw error;
		}
	},
	post: async <T, U>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<U> => {
		try {
			const response = await apiClient.post<U>(url, data, config);
			return response.data;
		} catch (error) {
			console.error('API POST error (unauth):', error);
			throw error;
		}
	},
};

export const apiAuth = {
	get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		try {
			const response = await apiClientAuth.get<T>(url, config);
			return response.data;
		} catch (error) {
			console.error('API GET error (auth):', error);
			throw error;
		}
	},
	post: async <T, U>(
		url: string,
		data: T,
		config?: AxiosRequestConfig
	): Promise<U> => {
		try {
			const response = await apiClientAuth.post<U>(url, data, config);
			return response.data;
		} catch (error) {
			console.error('API POST error (auth):', error);
			throw error;
		}
	},
};
