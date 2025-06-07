/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {VIEW_MODES} from '../../utility/constant';
import {RootState} from '..';

export interface ClaimFilters {
	claimStatusByCompany?: string[];
	tyreCompany?: string[];
	billDateFrom?: string;
	billDateTo?: string;
	viewMode: string;
}

const initialState: ClaimFilters = {
	claimStatusByCompany: [],
	tyreCompany: [],
	billDateFrom: '',
	billDateTo: '',
	viewMode: VIEW_MODES.LIST,
};

const filterKeys: (keyof ClaimFilters)[] = [
	'claimStatusByCompany',
	'tyreCompany',
	'billDateFrom',
	'billDateTo',
];

const claimFiltersSlice = createSlice({
	name: 'claimFilters',
	initialState,
	reducers: {
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
		setViewMode(state, action: PayloadAction<string>) {
			state.viewMode = action.payload;
		},
	},
});

export const {setFilter, setMultipleFilters, resetFilters, setViewMode} =
	claimFiltersSlice.actions;
export const selectFilters = (state: RootState) => state.claimsFilter;

export const selectAppliedFiltersCount = createSelector(
	[selectFilters],
	(filters: ClaimFilters) => {
		return filterKeys.reduce((count, key) => {
			const value = filters[key];
			if (Array.isArray(value)) {
				return count + value.length;
			} else if (typeof value === 'string' && value.trim()) {
				return count + 1;
			}
			return count;
		}, 0);
	}
);

export const claimFiltersReducer = claimFiltersSlice.reducer;
