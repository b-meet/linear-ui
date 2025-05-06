import {ChangeEvent} from 'react';
import {CustomerDetailsState} from '../../redux/slices/claimsFormSlice';

export interface CustomerDetailsProps {
	details: CustomerDetailsState;
	onChange: (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	onNext: () => void;
	onBack: () => void;
}

export interface CustomerDetailsSaveResponse {
	data: CustomerData;
	message: string;
}

export interface CustomerData {
	userId: string;
	customerId: string;
	billNumber: string;
	leadRelation: 'new' | 'old' | 'other';
	complaintDetails: string;
	docketNumber: string;
	additionalRemarks: string;
	tyreImg: string[];
	claimStatusByCompany: 'pending' | 'approved' | 'rejected';
	lastTab: number;
	createdAt: string;
	updatedAt: string;
	_id: string;
	billDate: string;
}
