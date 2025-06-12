import {RowClickedEvent} from 'ag-grid-community';
import {Dispatch, SetStateAction} from 'react';

export const onRowClicked = (
	params: RowClickedEvent,
	setIsClaimWindowOpen: Dispatch<SetStateAction<boolean>>
) => {
	setIsClaimWindowOpen(true);
	console.log(params, 'row');
};
