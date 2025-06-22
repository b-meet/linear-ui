export enum STORAGE_SERVICES {
	LOCAL = 'LOCAL',
	SESSION = 'SESSION',
}

export type FormSection =
	| 'customerDetails'
	| 'tyreDetails'
	| 'vehicleDetails'
	| 'issuance';

//login
export interface ILoginPayload {
	email: string;
	password: string;
}

export interface ILoginResponse {
	data: {
		token?: string;
		user: IUserData;
	};
	message: string;
	status: number;
}

export interface IUserData {
	name?: string;
	email: string;
	organisationName: string;
}

//register
export interface IRegisterPayload {
	companyName: string;
	email: string;
	password: string;
}

export interface IRegisterResponse {
	data: {
		token?: string;
		user: IUserData;
	};
	message: string;
	status: number;
}

export interface IUserData {
	name?: string;
	email: string;
	organisationName: string;
}

// AG Grid State Types
export interface IGridState {
	columnState: unknown[];
	columnGroupState?: unknown[];
	sortModel?: unknown[];
	filterModel?: unknown;
}

// Storage keys for grid state
export const GRID_STORAGE_KEYS = {
	CLAIMS_GRID_STATE: 'claims_grid_state',
} as const;
