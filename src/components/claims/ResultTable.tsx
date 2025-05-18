import {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {themeAlpine, ColDef} from 'ag-grid-community';
import {getClaimsData} from './dataSource';
import {Claim} from './types';

// Helper function to format date strings
const formatDate = (dateString: string | null | undefined): string => {
	if (!dateString) return '';
	try {
		const date = new Date(dateString);
		// Check if the date is valid
		if (isNaN(date.getTime())) {
			return dateString; // Return original string if invalid date
		}
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		};
		return date.toLocaleDateString('en-GB', options).replace(/\//g, ' '); // Format as "DD Mon YYYY"
	} catch (error) {
		console.error('Error formatting date:', dateString, error);
		return dateString; // Return original string on error
	}
};

const apiClaimColDefs: ColDef<Claim>[] = [
	{
		headerName: 'Bill Number',
		field: 'billNumber',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Customer Name',
		field: 'customerId.name',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Mobile Number',
		field: 'customerId.mobileNumber',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Lead Relation',
		field: 'leadRelation',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Complaint Details',
		field: 'complaintDetails',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Docket Number',
		field: 'docketNumber',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Additional Remarks',
		field: 'additionalRemarks',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Bill Date',
		field: 'billDate',
		sortable: true,
		filter: true,
		minWidth: 150,
		valueFormatter: (params) => formatDate(params.value),
	},
	{
		headerName: 'Tyre Company',
		field: 'tyreCompany',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Tyre Pattern',
		field: 'tyrePattern',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Tyre Sent Through',
		field: 'tyreSentThrough',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Tyre Serial Number',
		field: 'tyreSerialNumber',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Tyre Size',
		field: 'tyreSize',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Warranty Details',
		field: 'warrentyDetails',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Depreciation Amount',
		field: 'depreciationAmt',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Distance Covered',
		field: 'distanceCovered',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Vehicle Number',
		field: 'vehicleNumber',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Vehicle Type',
		field: 'vehicleType',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Tyre Sent Date',
		field: 'tyreSentDate',
		sortable: true,
		filter: true,
		minWidth: 150,
		valueFormatter: (params) => formatDate(params.value),
	},
	{
		headerName: 'Return Date',
		field: 'returnToCustomerDt',
		sortable: true,
		filter: true,
		minWidth: 150,
		valueFormatter: (params) => formatDate(params.value),
	},
	{
		headerName: 'Claim Status',
		field: 'claimStatusByCompany',
		sortable: true,
		filter: true,
		minWidth: 150,
	},
	{
		headerName: 'Final Claim Status',
		field: 'finalClaimStatus',
		cellRenderer: 'agCheckboxCellRenderer',
		cellRendererParams: {disabled: true},
		sortable: true,
		filter: true,
		minWidth: 150,
	},
];

const ResultTable = () => {
	const gridRef = useRef<AgGridReact | null>(null);
	const [columnDefs, setColumnDefs] = useState<ColDef[]>(apiClaimColDefs); // Use new colDefs
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [rowData, setRowData] = useState<Claim[]>([]);

	const [columnVisibility, setColumnVisibility] = useState<
		Record<string, boolean>
	>(() => {
		const initialVisibility: Record<string, boolean> = {};
		apiClaimColDefs.forEach((col) => {
			// Use new colDefs for initial visibility
			if (col.field) {
				initialVisibility[col.field] = true;
			}
		});
		return initialVisibility;
	});

	const defaultColDef = useMemo(
		() => ({
			flex: 1,
			hide: false,
		}),
		[]
	);

	const customeTheme = useMemo(
		() =>
			themeAlpine.withParams({
				accentColor: '#3ea692',
			}),
		[]
	);

	const toggleColumnVisibility = (field: string) => {
		const newShouldBeVisible = !columnVisibility[field];

		setColumnVisibility((prevVisibility) => ({
			...prevVisibility,
			[field]: newShouldBeVisible,
		}));

		setColumnDefs((prevColDefs) =>
			prevColDefs.map((col) => {
				if (col.field === field) {
					return {...col, hide: !newShouldBeVisible};
				}
				return col;
			})
		);
	};

	const toggleSidebar = useCallback(() => {
		setSidebarVisible(!sidebarVisible);
	}, [sidebarVisible]);

	useEffect(() => {
		const getClaims = async () => {
			try {
				const response = await getClaimsData();
				if (response && Array.isArray(response.data)) {
					setRowData(response.data);
				} else {
					console.error(
						'Fetched data is not in the expected format:',
						response
					);
					setRowData([]);
				}
			} catch (error) {
				console.error('Error fetching claims data:', error);
			}
		};

		getClaims();
	}, []);

	console.log(rowData, 'roe');

	return (
		<div className="flex h-full w-full relative">
			<div className="flex flex-row-reverse flex-1">
				<div className="relative w-8 rounded-tl-md rounded-tr-md">
					<button
						onClick={toggleSidebar}
						className="px-4 h-[33px] rounded-tl-md rounded-tr-md bg-brand-light border border-[#D9D9D9] border-b-0  rotate-90 absolute top-8 -left-8 z-50  hover:bg-brand-light-hover cursor-pointer"
					>
						Columns
					</button>
				</div>

				{sidebarVisible && (
					<div className="w-56 border border-[#D9D9D9] border-l-0 bg-brand-light py-2 px-4 overflow-y-auto">
						<div className="font-semibold py-2">Toggle Columns</div>
						{columnDefs.map((col) => {
							if (!col.field) return null;
							return (
								<div key={col.field} className="flex items-center gap-2 mb-1">
									<input
										type="checkbox"
										id={`col-${col.field}`}
										checked={!col.hide}
										onChange={() => toggleColumnVisibility(col.field!)}
										className="mr-2"
									/>
									<label
										htmlFor={`col-${col.field}`}
										className="cursor-pointer"
									>
										{col.headerName || col.field}
									</label>
								</div>
							);
						})}
					</div>
				)}

				<div className="flex-1">
					<AgGridReact
						ref={gridRef}
						rowData={rowData}
						columnDefs={columnDefs}
						theme={customeTheme}
						defaultColDef={defaultColDef}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResultTable;
