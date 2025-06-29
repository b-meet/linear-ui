import {Dispatch, SetStateAction} from 'react';

export interface Customer {
	_id: string;
	userId: string;
	name: string;
	mobileNumber: string;
}

export interface Claim {
	_id: string;
	userId: string;
	customerId: Customer;
	billNumber: string;
	leadRelation: string;
	complaintDetails: string;
	docketNumber: string;
	additionalRemarks: string;
	claimStatusByCompany: string;
	lastTab: number;
	billDate: string;
	tyreCompany?: string;
	tyrePattern?: string;
	tyreSentThrough?: string;
	tyreSerialNumber?: string;
	tyreSize?: string;
	warrentyDetails?: string;
	depreciationAmt?: string;
	finalClaimStatus?: boolean;
	distanceCovered?: string;
	vehicleNumber?: string;
	vehicleType?: string;
	tyreSentDate?: string; // Added missing date field
	returnToCustomerDt?: string; // Added missing date field
	tyreImg?: string[];
}

export interface IGetClaimResponse {
	message: string;
	data: Claim[];
}

export interface EditClaimWindowProps {
	setIsClaimWindowOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ResultTableProps {
	setIsClaimWindowOpen: Dispatch<SetStateAction<boolean>>;
}

export interface GridViewContainerProps {
	setIsClaimWindowOpen: Dispatch<SetStateAction<boolean>>;
}
