import {ColDef} from 'ag-grid-community';
import EditableColHeader from './fields/EditableColHeader';
import ClaimStatusRenderer from './fields/ClaimStatus';
import {Claim} from './types';

const formatDate = (dateString: string | null | undefined): string => {
	if (!dateString) return '';
	try {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return dateString;
		}
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		};
		return date.toLocaleDateString('en-GB', options).replace(/\//g, ' ');
	} catch (error) {
		console.error('Error formatting date:', dateString, error);
		return dateString;
	}
};

export const apiClaimColDefs: ColDef<Claim>[] = [
	{
		headerName: 'Bill Number',
		field: 'billNumber',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Customer Name',
		field: 'customerId.name',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Mobile Number',
		field: 'customerId.mobileNumber',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Lead Relation',
		field: 'leadRelation',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Complaint Details',
		field: 'complaintDetails',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Docket Number',
		field: 'docketNumber',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Additional Remarks',
		field: 'additionalRemarks',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Bill Date',
		field: 'billDate',
		sortable: true,
		minWidth: 150,
		valueFormatter: (params) => formatDate(params.value),
	},
	{
		headerName: 'Tyre Company',
		field: 'tyreCompany',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Tyre Pattern',
		field: 'tyrePattern',
		sortable: true,
		minWidth: 150,
	},
	{
		headerComponent: EditableColHeader,
		headerComponentParams: {
			displayName: 'Tyre Sent Through',
		},
		field: 'tyreSentThrough',
		sortable: true,
		minWidth: 150,
		editable: true,
	},
	{
		headerName: 'Tyre Serial Number',
		field: 'tyreSerialNumber',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Tyre Size',
		field: 'tyreSize',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Warranty Details',
		field: 'warrentyDetails',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Depreciation Amount',
		field: 'depreciationAmt',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Distance Covered',
		field: 'distanceCovered',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Vehicle Number',
		field: 'vehicleNumber',
		sortable: true,
		minWidth: 150,
	},
	{
		headerName: 'Vehicle Type',
		field: 'vehicleType',
		sortable: true,
		minWidth: 150,
	},
	{
		headerComponent: EditableColHeader,
		headerComponentParams: {
			displayName: 'Tyre Sent Date',
		},
		field: 'tyreSentDate',
		sortable: true,
		minWidth: 150,
		valueFormatter: (params) => formatDate(params.value),
		editable: true,
		cellEditor: 'agDateCellEditor',
		cellEditorPopup: true,
		valueGetter: (params) => {
			if (!params.data) return null;
			const dateString = params.data.tyreSentDate;
			if (!dateString) return null;
			const date = new Date(dateString);
			return isNaN(date.getTime()) ? null : date;
		},
		valueSetter: (params) => {
			if (!params.data) return false;
			const date = params.newValue;
			if (!date) {
				params.data.tyreSentDate = undefined;
			} else {
				params.data.tyreSentDate = date.toISOString();
			}
			return true;
		},
	},
	{
		headerName: 'Return Date',
		field: 'returnToCustomerDt',
		sortable: true,
		minWidth: 150,
		valueFormatter: (params) => formatDate(params.value),
	},
	{
		headerComponent: EditableColHeader,
		headerComponentParams: {
			displayName: 'Claim Status',
		},
		field: 'claimStatusByCompany',
		sortable: true,
		minWidth: 150,
		cellRenderer: ClaimStatusRenderer,
		editable: true,
		cellEditor: 'agSelectCellEditor',
		cellEditorParams: {
			values: ['accepted', 'rejected', 'pending'],
		},
	},
	{
		headerName: 'Final Claim Status',
		field: 'finalClaimStatus',
		cellRenderer: 'agCheckboxCellRenderer',
		cellRendererParams: {disabled: true},
		sortable: true,
		minWidth: 150,
	},
];
