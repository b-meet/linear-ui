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
	tyreImg?: string[];
}

export interface IGetClaimResponse {
	message: string;
	data: Claim[];
}
