import {configureStore} from '@reduxjs/toolkit';
import {snackbarReducer} from './slices/snackbarSlice/snackbarSlice';

const store = configureStore({
	reducer: {
		snackbar: snackbarReducer,
		// user: userReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
