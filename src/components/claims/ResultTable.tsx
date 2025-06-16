import {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {themeAlpine, ColDef} from 'ag-grid-community';
import {API_ROUTES} from '../../utility/constant';
import {ICellRendererParams} from 'ag-grid-community';
import {FiDownload} from 'react-icons/fi';
import {API_BASE_URL} from '../../utility/environment';
import {onRowClicked} from '.';
import {apiClaimColDefs} from './defaults';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {fetchClaimsData} from '../../redux/slices/claimsDataSlice';
import {ResultTableProps} from './types';

export const CustomActionsRenderer = (params: ICellRendererParams) => {
	const downloadAcknowledgement = async (id: string | number) => {
		window.open(
			`${API_BASE_URL}/${API_ROUTES.GET_CLAIM_CUSTOMER_PDF}/${id}`,
			'_blank'
		);
	};

	return (
		<button
			onClick={() => downloadAcknowledgement(params.data._id)}
			title="Download Acknowledgement"
			className="cursor-pointer text-brand hover:text-brand-hover"
		>
			<FiDownload />
		</button>
	);
};

const ResultTable = ({setIsClaimWindowOpen}: ResultTableProps) => {
	const dispatch = useAppDispatch();
	const {claimsData, loading, error} = useAppSelector(
		(state) => state.claimsData
	);
	const gridRef = useRef<AgGridReact | null>(null);
	const [columnDefs, setColumnDefs] = useState<ColDef[]>([
		...apiClaimColDefs,
		{
			headerName: 'Actions',
			field: 'actions',
			cellRenderer: CustomActionsRenderer,
			minWidth: 100,
			maxWidth: 120,
			resizable: false,
			sortable: false,
			filter: false,
		},
	]);
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [columnVisibility, setColumnVisibility] = useState<
		Record<string, boolean>
	>(() => {
		const initialVisibility: Record<string, boolean> = {};
		apiClaimColDefs.forEach((col) => {
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
			filter: false,
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
		dispatch(fetchClaimsData());
	}, [dispatch]);

	if (error) {
		return (
			<div className="flex h-[calc(100vh_-_135px)] w-full items-center justify-center">
				<div className="text-red-500 text-center">
					<p className="text-lg font-semibold">Error loading claims data</p>
					<p className="text-sm">{error}</p>
					<button
						onClick={() => dispatch(fetchClaimsData())}
						className="mt-4 px-4 py-2 bg-brand text-white rounded hover:bg-brand-hover"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-[calc(100vh_-_135px)] w-full">
			<div className="flex flex-row-reverse flex-1">
				{/* column switcher */}
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
						singleClickEdit
						rowData={claimsData}
						columnDefs={columnDefs}
						theme={customeTheme}
						defaultColDef={defaultColDef}
						loading={loading}
						onRowClicked={(params) =>
							onRowClicked(params, setIsClaimWindowOpen, dispatch)
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResultTable;
