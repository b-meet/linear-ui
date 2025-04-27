import axios, {AxiosRequestConfig} from 'axios';
import {API_BASE_URL} from '../utility/environment';

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const apiUnAuth = {
	get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		try {
			const response = await apiClient.get<T>(url, config);
			return response.data;
		} catch (error) {
			console.error('API GET error:', error);
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
			console.error('API POST error:', error);
			throw error;
		}
	},
};
