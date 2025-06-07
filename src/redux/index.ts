import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './slices/userSlice/userSlice';
import {claimsFormReducer} from './slices/claimsFormSlice';
import {claimFiltersReducer} from './slices/claimsFiltersSlice';

const store = configureStore({
	reducer: {
		user: userReducer,
		claimsForm: claimsFormReducer,
		claimsFilter: claimFiltersReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
