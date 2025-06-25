export const API_ROUTES = {
	LOGIN: '/api/user/login',
	REGISTER: '/api/user/register',
	FORGOT_PASSWORD: '/api/user/forgot-password',
	VERIFY_OTP: '/api/user/verify-otp',

	SAVE_APP: '/api/claims/add-claim',
	ADD_CLAIMS: '/api/claims/add-claim',
	GET_CLAIMS: '/api/claims/get-claims',
	GET_SINGLE_CLAIM: '/api/claims/get-claim',
	GET_CLAIM_CUSTOMER_PDF: 'api/claims/get-claim-pdf',

	GET_CUSTOMER: 'api/customers/get-customers',
};

export const TYRE_COMPANIES = [
	'Apollo Tyres',
	'BKT (Balkrishna Industries)',
	'Birla Tyres',
	'Bridgestone India',
	'CEAT',
	'Continental Tyres India',
	'Goodyear India',
	'JK Tyre & Industries',
	'Kenda Tyres',
	'Metro Tyres',
	'Michelin India',
	'MRF',
	'Ralco Tyres',
	'TVS Eurogrip',
	'Yokohama India',
];

export enum TyreCompany {
	MRF = 'MRF',
	Apollo = 'Apollo Tyres',
	CEAT = 'CEAT',
	JK = 'JK Tyre & Industries',
	Birla = 'Birla Tyres',
	TVS = 'TVS Eurogrip',
	Bridgestone = 'Bridgestone India',
	Michelin = 'Michelin India',
	Goodyear = 'Goodyear India',
	Continental = 'Continental Tyres India',
	Yokohama = 'Yokohama India',
	Ralco = 'Ralco Tyres',
	BKT = 'BKT (Balkrishna Industries)',
	Metro = 'Metro Tyres',
	Kenda = 'Kenda Tyres',
}

export const VIEW_MODES = {
	LIST: 'list',
	GRID: 'grid',
};
