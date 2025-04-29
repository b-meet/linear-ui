import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

export interface CustomerDetailsState {
	customerName: string;
	customerNumber: string;
	billDate: string;
	billNumber: string;
}

// Placeholder interfaces for other sections
export interface TyreDetailsState {
	// Add tyre fields here, e.g., brand: string, size: string;
	[key: string]: unknown; // Allow flexibility for now
}

export interface VehicleDetailsState {
	// Add vehicle fields here, e.g., make: string, model: string, year: number;
	[key: string]: unknown;
}

export interface IssuanceState {
	// Add issuance fields here, e.g., policyStartDate: string, agentName: string;
	[key: string]: unknown;
}

// Define the overall state structure for the claims form
export interface ClaimsFormState {
	customerDetails: CustomerDetailsState;
	tyreDetails: TyreDetailsState; // Added TyreDetails
	vehicleDetails: VehicleDetailsState; // Added VehicleDetails
	issuance: IssuanceState; // Added Issuance
}

const initialState: ClaimsFormState = {
	customerDetails: {
		customerName: '',
		customerNumber: '',
		billDate: '',
		billNumber: '',
	},
	tyreDetails: {}, // Initialize TyreDetails
	vehicleDetails: {}, // Initialize VehicleDetails
	issuance: {}, // Initialize Issuance
};

interface UpdateFieldPayload {
	fieldPath: string;
	value: unknown;
}

const claimsFormSlice = createSlice({
	name: 'claimsForm',
	initialState,
	reducers: {
		initializeForm: (_, action: PayloadAction<ClaimsFormState>) => {
			return action.payload;
		},
		updateFormField: (state, action: PayloadAction<UpdateFieldPayload>) => {
			const {fieldPath, value} = action.payload;
			const keys = fieldPath.split('.');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let currentLevel: Record<string, any> = state;

			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];
				if (
					currentLevel[key] === undefined ||
					typeof currentLevel[key] !== 'object'
				) {
					currentLevel[key] = {};
				}
				currentLevel = currentLevel[key];
			}

			currentLevel[keys[keys.length - 1]] = value;
		},
		resetForm: () => {
			return initialState;
		},
	},
});

export const {initializeForm, updateFormField, resetForm} =
	claimsFormSlice.actions;
export const selectClaimsForm = (state: RootState) => state.claimsForm;

// Selectors for each section
export const selectClaimsCustomerDetails = (state: RootState) =>
	state.claimsForm.customerDetails;
export const selectClaimsTyreDetails = (state: RootState) =>
	state.claimsForm.tyreDetails;
export const selectClaimsVehicleDetails = (state: RootState) =>
	state.claimsForm.vehicleDetails;
export const selectClaimsIssuance = (state: RootState) =>
	state.claimsForm.issuance;

export const claimsFormReducer = claimsFormSlice.reducer;
