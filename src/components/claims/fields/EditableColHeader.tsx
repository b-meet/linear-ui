import {IHeaderParams} from 'ag-grid-community';

const EditableColHeader = (props: IHeaderParams) => {
	return (
		<div className="flex flex-col gap-1">
			<span>{props.displayName}</span>
			<span className="text-[10px] text-gray-500">Click to edit</span>
		</div>
	);
};

export default EditableColHeader;
