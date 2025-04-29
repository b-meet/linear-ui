import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './slices/userSlice/userSlice';
import {claimsFormReducer} from './slices/claimsFormSlice'; // Import the new claims form reducer

const store = configureStore({
	reducer: {
		user: userReducer,
		claimsForm: claimsFormReducer, // Use the claims form reducer
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
