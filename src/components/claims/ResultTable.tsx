import {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {themeAlpine, ColDef} from 'ag-grid-community';
import {getClaimsData} from './dataSource';
import {Claim} from './types';
import {API_ROUTES} from '../../utility/constant';
import {ICellRendererParams} from 'ag-grid-community';
import {FiDownload} from 'react-icons/fi';
import {API_BASE_URL} from '../../utility/environment';
import {onRowClicked} from '.';
import {apiClaimColDefs} from './defaults';
import AddClaims from '../../pages/AddClaims';
import {CgClose} from 'react-icons/cg';
import {useAppDispatch} from '../../hooks/redux';

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

const ResultTable = () => {
	const dispatch = useAppDispatch();
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
	const [isClaimWindowOpen, setIsClaimWindowOpen] = useState(false);
	const [rowData, setRowData] = useState<Claim[]>([]);
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

				{/* claims form for editing */}
				{isClaimWindowOpen && (
					<section className="absolute top-0 bottom-0 right-0 w-full z-50 drop-shadow-lg flex justify-end bg-black/50">
						<div className="w-[575px] bg-white">
							<div className="p-4">
								<h2 className="text-xl font-semibold mb-4">Edit Claim</h2>
								<AddClaims showHeader={false} />
								<button
									onClick={() => setIsClaimWindowOpen(false)}
									className="absolute top-4 right-[585px] bg-white hover:bg-brand text-black hover:text-white p-1.5 rounded cursor-pointer"
								>
									<CgClose />
								</button>
							</div>
						</div>
					</section>
				)}

				<div className="flex-1">
					<AgGridReact
						ref={gridRef}
						singleClickEdit
						rowData={rowData}
						columnDefs={columnDefs}
						theme={customeTheme}
						defaultColDef={defaultColDef}
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
