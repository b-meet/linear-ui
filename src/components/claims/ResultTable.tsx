import {AgGridReact} from 'ag-grid-react';
import {themeAlpine, type ColDef} from 'ag-grid-community';
import {getClaimsData} from './dataSource';
import {claimFormColDefs} from './fields/defaults';

const ResultTable = () => {
	const defaultColDef: ColDef = {
		flex: 1,
	};
	console.log(getClaimsData(), 'data');

	const customeTheme = themeAlpine.withParams({
		accentColor: '#3ea692',
	});

	return (
		<div style={{width: '100%', height: '100%'}}>
			<AgGridReact
				rowData={[
					{make: 'Mercedes', model: 'EQA', price: 48890, electric: true},
					{make: 'Mercedes', model: 'EQA', price: 48890, electric: true},
					{make: 'Mercedes', model: 'EQA', price: 48890, electric: true},
				]}
				columnDefs={claimFormColDefs}
				theme={customeTheme}
				defaultColDef={defaultColDef}
			/>
		</div>
	);
};

export default ResultTable;
