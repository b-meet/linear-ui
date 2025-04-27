import {STORAGE_SERVICES} from '../type';

export const storageServices = {
	set: (type: STORAGE_SERVICES, dataKey: string, data?: unknown): void => {
		const serializedData = JSON.stringify(data);
		if (type === STORAGE_SERVICES.LOCAL) {
			if (serializedData) {
				localStorage.setItem(dataKey, serializedData);
			} else {
				localStorage.removeItem(dataKey);
			}
		} else {
			if (serializedData) {
				sessionStorage.setItem(dataKey, serializedData);
			} else {
				sessionStorage.removeItem(dataKey);
			}
		}
	},

	get: (type: STORAGE_SERVICES, dataKey: string): unknown | null => {
		let storageData = null;
		if (type === STORAGE_SERVICES.LOCAL) {
			storageData = localStorage.getItem(dataKey);
		} else {
			storageData = sessionStorage.getItem(dataKey);
		}
		return storageData !== null ? JSON.parse(storageData) : null;
	},

	terminate: (type?: STORAGE_SERVICES): void => {
		if (!type) {
			localStorage.clear();
			sessionStorage.clear();
			return;
		}
		if (type === STORAGE_SERVICES.LOCAL) {
			localStorage.clear();
		} else {
			sessionStorage.clear();
		}
	},
};
