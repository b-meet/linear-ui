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
