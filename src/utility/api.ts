import {apiUnAuth} from '../api/services';
import {API_ROUTES} from './constant';

export const login = async (payload: {email: ''; password: ''}) => {
	apiUnAuth.post(API_ROUTES.LOGIN, payload);
};
