import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ClaimFilters {
	claimStatusByCompany?: string[];
	tyreCompany?: string[];
	billDateFrom?: string;
	billDateTo?: string;
}

const initialState: ClaimFilters = {
	claimStatusByCompany: [],
	tyreCompany: [],
	billDateFrom: '',
	billDateTo: '',
};

const claimFiltersSlice = createSlice({
	name: 'claimFilters',
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setFilter(
			state,
			action: PayloadAction<{field: keyof ClaimFilters; value: any}>
		) {
			state[action.payload.field] = action.payload.value;
		},
		setMultipleFilters(state, action: PayloadAction<Partial<ClaimFilters>>) {
			Object.assign(state, action.payload);
		},
		resetFilters() {
			return initialState;
		},
	},
});

export const {setFilter, setMultipleFilters, resetFilters} =
	claimFiltersSlice.actions;
export const claimFiltersReducer = claimFiltersSlice.reducer;
