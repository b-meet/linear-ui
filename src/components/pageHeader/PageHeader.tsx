import {IoFilterSharp} from 'react-icons/io5';

interface PageHeaderProps {
	onFilterClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({onFilterClick}) => {
	return (
		<>
			<h1 className="text-2xl text-slate-900 mb-2">Search claims</h1>
			<div className="flex gap-2 mb-3">
				<button
					onClick={onFilterClick}
					className="text-slate-600 rounded-sm border border-slate-400 py-2 px-3 text-sm flex items-center gap-2 cursor-pointer hover:border-slate-700 hover:text-slate-900"
				>
					<IoFilterSharp /> Filters (0)
				</button>
				<form>
					<div className="flex items-center gap-2">
						<input
							type="text"
							id="claimId"
							name="claimId"
							placeholder="Docker, bill, phone etc."
							className="border border-slate-400 px-3 py-2 w-96 rounded-sm"
						/>
						<button
							type="submit"
							className="bg-brand text-white py-[9px] px-3 rounded-sm hover:bg-brand-darker"
						>
							Search
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default PageHeader;
