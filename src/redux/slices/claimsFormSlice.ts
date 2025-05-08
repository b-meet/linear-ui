import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

export interface CustomerDetailsState {
	customerName: string;
	customerNumber: string;
	billDate: string;
	billNumber: string;
	docketNumber: string;
	leadRelation: string;
	complaintDetails: string;
	additionalRemarks: string;
}

export interface TyreDetailsState {
	warrentyDetails: string;
	tyreSerialNumber: string;
	tyrePattern: string;
	tyreSize: string;
	tyreSentDate: string | null;
	tyreSentThrough: string;
	tyreCompany: string;
	tyreImg?: string[];
}

export interface VehicleDetailsState {
	vehicleNumber: string;
	type: string;
	distanceCovered: string;
}

export interface IssuanceState {
	depreciationAmt: string;
	claimStatusByCompany: string;
	returnToCustomerDt: string | null;
	finalClaimStatus: boolean;
}

export interface ClaimsFormState {
	customerDetails: CustomerDetailsState;
	tyreDetails: TyreDetailsState;
	vehicleDetails: VehicleDetailsState;
	issuance: IssuanceState;
}

const initialState: ClaimsFormState = {
	customerDetails: {
		customerName: '',
		customerNumber: '',
		billDate: '',
		billNumber: '',
		docketNumber: '',
		leadRelation: '',
		complaintDetails: '',
		additionalRemarks: '',
	},
	tyreDetails: {
		warrentyDetails: '',
		tyreSerialNumber: '',
		tyrePattern: '',
		tyreSize: '',
		tyreSentDate: null,
		tyreSentThrough: '',
		tyreCompany: '',
		tyreImg: [],
	},
	vehicleDetails: {
		vehicleNumber: '',
		type: '',
		distanceCovered: '',
	},
	issuance: {
		depreciationAmt: '',
		claimStatusByCompany: 'pending',
		returnToCustomerDt: null,
		finalClaimStatus: false,
	},
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
export const selectClaimsCustomerDetails = (state: RootState) =>
	state.claimsForm.customerDetails;
export const selectClaimsTyreDetails = (state: RootState) =>
	state.claimsForm.tyreDetails;
export const selectClaimsVehicleDetails = (state: RootState) =>
	state.claimsForm.vehicleDetails;
export const selectClaimsIssuance = (state: RootState) =>
	state.claimsForm.issuance;

export const claimsFormReducer = claimsFormSlice.reducer;
