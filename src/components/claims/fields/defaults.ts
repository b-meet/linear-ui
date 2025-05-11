import {ColDef} from 'ag-grid-community';

const COL_WIDHT = {
	MIN: {
		SHORT: 100,
		MEDIUM: 150,
		LONG: 250,
	},
	MAX: {
		SHORT: 150,
		MEDIUM: 200,
		LONG: 300,
	},
};

export const claimFormColDefs: ColDef[] = [
	{
		field: 'customerDetails.customerName',
		headerName: 'Customer Name',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'customerDetails.customerNumber',
		headerName: 'Mobile Number',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'customerDetails.billDate',
		headerName: 'Bill Date',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'customerDetails.billNumber',
		headerName: 'Bill Number',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'customerDetails.docketNumber',
		headerName: 'Docket Number',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'customerDetails.leadRelation',
		headerName: 'Lead Relation',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'customerDetails.complaintDetails',
		headerName: 'Complaint Details',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'customerDetails.additionalRemarks',
		headerName: 'Remarks',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},

	{
		field: 'tyreDetails.warrentyDetails',
		headerName: 'Warranty Details',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'tyreDetails.tyreSerialNumber',
		headerName: 'Serial Number',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'tyreDetails.tyrePattern',
		headerName: 'Tyre Pattern',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'tyreDetails.tyreSize',
		headerName: 'Tyre Size',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'tyreDetails.tyreSentDate',
		headerName: 'Sent Date',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'tyreDetails.tyreSentThrough',
		headerName: 'Sent Through',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'tyreDetails.tyreCompany',
		headerName: 'Company',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},

	{
		field: 'vehicleDetails.vehicleNumber',
		headerName: 'Vehicle No.',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'vehicleDetails.type',
		headerName: 'Vehicle Type',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'vehicleDetails.distanceCovered',
		headerName: 'Distance Covered',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},

	{
		field: 'issuance.depreciationAmt',
		headerName: 'Depreciation Amt',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'issuance.claimStatusByCompany',
		headerName: 'Claim Status',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'issuance.returnToCustomerDt',
		headerName: 'Returned Date',
		minWidth: COL_WIDHT.MIN.SHORT,
		maxWidth: COL_WIDHT.MAX.LONG,
	},
	{
		field: 'issuance.finalClaimStatus',
		headerName: 'Final Status',
		cellRenderer: 'agCheckboxCellRenderer',
	},
];
