import axios, {AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';
import {storageServices} from './storageServices';
import {STORAGE_SERVICES} from '../type';
import {API_BASE_URL} from './environment';

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = storageServices.get(STORAGE_SERVICES.LOCAL, 'authToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const api = {
	get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		try {
			const response = await apiClient.get<T>(url, config);
			return response.data;
		} catch (error) {
			console.error('API GET error:', url, error);
			throw error;
		}
	},
	post: async <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> => {
		try {
			const response = await apiClient.post<T>(url, data, config);
			return response.data;
		} catch (error) {
			console.error('API POST error:', url, error);
			throw error;
		}
	},
};
