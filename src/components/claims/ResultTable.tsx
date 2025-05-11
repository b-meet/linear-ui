import {useState, useRef, useCallback, useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {themeAlpine, ColDef} from 'ag-grid-community'; // Keep ColDef
import {claimFormColDefs} from './fields/defaults';

const ResultTable = () => {
	const gridRef = useRef<AgGridReact | null>(null);
	const [columnDefs, setColumnDefs] = useState<ColDef[]>(claimFormColDefs);
	const [sidebarVisible, setSidebarVisible] = useState(false);

	const [columnVisibility, setColumnVisibility] = useState<
		Record<string, boolean>
	>(() => {
		const initialVisibility: Record<string, boolean> = {};
		claimFormColDefs.forEach((col) => {
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

	return (
		<div className="flex h-full w-full relative">
			{sidebarVisible && (
				<div className="w-56 absolute top-0 bottom-0 right-0 z-50 border-l border-l-[#D9D9D9] bg-gray-50 py-2 px-4 overflow-y-auto">
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
								<label htmlFor={`col-${col.field}`} className="cursor-pointer">
									{col.headerName || col.field}
								</label>
							</div>
						);
					})}
				</div>
			)}

			<div className="flex flex-row-reverse flex-1">
				<div className="relative w-8 bg-[#FAFAFA] rounded-tl-md rounded-tr-md">
					<button
						onClick={toggleSidebar}
						className="px-4 h-[33px] bg-gray-200 rotate-90 absolute top-[31px] -left-8 z-50  hover:bg-gray-300 cursor-pointer"
					>
						Columns
					</button>
				</div>

				<div className="flex-1 w-full">
					<AgGridReact
						ref={gridRef}
						rowData={[
							{make: 'Mercedes', model: 'EQA', price: 48890, electric: true},
							{make: 'Mercedes', model: 'EQB', price: 51250, electric: true},
							{make: 'Mercedes', model: 'EQC', price: 63950, electric: true},
						]}
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
