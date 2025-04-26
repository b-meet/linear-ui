import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISnackbarState} from '../../type';

const initialState: ISnackbarState = {
	open: false,
	message: '',
	duration: 5000,
};

const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		showSnackbar: (
			state,
			action: PayloadAction<{message: string; duration?: number}>
		) => {
			state.open = true;
			state.message = action.payload.message;
			state.duration = action.payload.duration ?? 5000;
		},
		hideSnackbar: (state) => {
			state.open = false;
			state.message = '';
		},
	},
});

export const snackbarActions = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;
