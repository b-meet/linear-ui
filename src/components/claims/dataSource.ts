import {apiAuth} from '../../api/services';
import {API_ROUTES} from '../../utility/constant';
import {IGetClaimResponse, Claim} from './types';

export const getClaimsData = async (): Promise<IGetClaimResponse> => {
	const resp: IGetClaimResponse = await apiAuth.get(API_ROUTES.GET_CLAIMS);
	return resp;
};

export const getClaimsDataWithFilters = async (
	filters?: Record<string, unknown>
): Promise<IGetClaimResponse> => {
	const params = filters
		? new URLSearchParams(filters as Record<string, string>).toString()
		: '';
	const url = params
		? `${API_ROUTES.GET_CLAIMS}?${params}`
		: API_ROUTES.GET_CLAIMS;
	const resp: IGetClaimResponse = await apiAuth.get(url);
	return resp;
};

export const getClaimById = async (
	claimId: string
): Promise<{message: string; data: Claim}> => {
	const resp: {message: string; data: Claim} = await apiAuth.get(
		`${API_ROUTES.GET_CLAIMS}/${claimId}`
	);
	return resp;
};

export const refreshClaimsData = async (): Promise<IGetClaimResponse> => {
	return await getClaimsData();
};
