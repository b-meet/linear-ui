export interface ISnackbarState {
	open: boolean;
	toastmsg: string;
	duration?: number;
}

export interface UserSliceState {
	user: {
		name?: string;
		email: string;
		organisationName: string;
	};
	isLoading: boolean;
	error: boolean | string;
	message: string;
}

//login
export interface ILoginPayload {
	email: string;
	password: string;
}

export interface ILoginResponse {
	data: {
		token?: string;
		user: IUserData;
		message?: string;
	};
	message: string;
}

export interface IUserData {
	name?: string;
	email: string;
	organisationName: string;
}
