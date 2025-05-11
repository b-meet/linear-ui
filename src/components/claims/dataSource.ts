import {apiAuth} from '../../api/services';
import {API_ROUTES} from '../../utility/constant';

export const getClaimsData = async () => {
	const resp = await apiAuth.get(API_ROUTES.GET_CLAIMS);
	return resp;
	console.log(resp, 'resp');
};
