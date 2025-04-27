import {createSlice} from '@reduxjs/toolkit';
import {UserSliceState} from '../../type';

const initialState: UserSliceState = {
	user: {
		name: '',
		email: '',
		organisationName: '',
	},
	isLoading: false,
	error: false,
	message: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUser: (state) => {
			state.user = {
				name: '',
				email: '',
				organisationName: '',
			};
			state.isLoading = false;
			state.error = false;
			state.message = '';
		},
	},
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
