/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Claim} from '../../components/claims/types';

export interface ClaimsDataState {
	claimsData: Claim[];
	totalCount: number;
	loading: boolean;
	error: string | null;
}

const initialState: ClaimsDataState = {
	claimsData: [],
	totalCount: 0,
	loading: false,
	error: null,
};

export const fetchClaimsData = createAsyncThunk(
	'claimsData/fetchClaimsData',
	async (_, {rejectWithValue}) => {
		try {
			const {getClaimsData} = await import(
				'../../components/claims/dataSource'
			);
			const response = await getClaimsData();
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to fetch claims data');
		}
	}
);

const claimsDataSlice = createSlice({
	name: 'claimsData',
	initialState,
	reducers: {
		setClaimsData: (state, action) => {
			state.claimsData = action.payload;
			state.totalCount = action.payload.length;
		},
		appendClaimsData: (state, action) => {
			state.claimsData = [...state.claimsData, ...action.payload];
			state.totalCount = state.claimsData.length;
		},
		resetClaimsData: (state) => {
			state.claimsData = [];
			state.totalCount = 0;
			state.error = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClaimsData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchClaimsData.fulfilled, (state, action) => {
				state.loading = false;
				state.claimsData = action.payload;
				state.totalCount = action.payload.length;
				state.error = null;
			})
			.addCase(fetchClaimsData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {setClaimsData, appendClaimsData, resetClaimsData, clearError} =
	claimsDataSlice.actions;
export const claimsDataReducer = claimsDataSlice.reducer;
