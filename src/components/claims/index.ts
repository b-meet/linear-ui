import {RowClickedEvent} from 'ag-grid-community';
import {Dispatch, SetStateAction} from 'react';
import {AppDispatch} from '../../redux/index';
import {
	initializeForm,
	ClaimsFormState,
} from '../../redux/slices/claimsFormSlice';
import {Claim} from './types';
import {TyreCompany} from '../../utility/constant';

const mapClaimToFormState = (claim: Claim): ClaimsFormState => {
	return {
		customerDetails: {
			customerName: claim.customerId?.name || '',
			customerNumber: claim.customerId?.mobileNumber || '',
			billDate: claim.billDate || '',
			billNumber: claim.billNumber || '',
			docketNumber: claim.docketNumber || '',
			leadRelation: claim.leadRelation || '',
			complaintDetails: claim.complaintDetails || '',
			additionalRemarks: claim.additionalRemarks || '',
		},
		tyreDetails: {
			warrentyDetails: claim.warrentyDetails || '',
			tyreSerialNumber: claim.tyreSerialNumber || '',
			tyrePattern: claim.tyrePattern || '',
			tyreSize: claim.tyreSize || '',
			tyreSentDate: claim.tyreSentDate || null,
			tyreSentThrough: claim.tyreSentThrough || '',
			tyreCompany: (claim.tyreCompany as TyreCompany) || '',
			tyreImg: claim.tyreImg || [],
		},
		vehicleDetails: {
			vehicleNumber: claim.vehicleNumber || '',
			type: claim.vehicleType || '',
			distanceCovered: claim.distanceCovered || '',
		},
		issuance: {
			depreciationAmt: claim.depreciationAmt || '',
			claimStatusByCompany: claim.claimStatusByCompany || 'pending',
			returnToCustomerDt: claim.returnToCustomerDt || null,
			finalClaimStatus: claim.finalClaimStatus || false,
		},
	};
};

export const onRowClicked = (
	params: RowClickedEvent,
	setIsClaimWindowOpen: Dispatch<SetStateAction<boolean>>,
	dispatch: AppDispatch
) => {
	const claimData: Claim = params.data;
	const formState = mapClaimToFormState(claimData);

	dispatch(initializeForm(formState));
	setIsClaimWindowOpen(true);

	console.log('Editing claim:', claimData);
};
