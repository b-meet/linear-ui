import {apiAuth} from '../../api/services';
import {API_ROUTES} from '../../utility/constant';
import {IGetClaimResponse} from './types';

export const getClaimsData = async (): Promise<IGetClaimResponse> => {
	const resp: IGetClaimResponse = await apiAuth.get(API_ROUTES.GET_CLAIMS);
	return resp;
};
