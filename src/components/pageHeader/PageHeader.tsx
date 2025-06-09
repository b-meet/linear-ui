import {FaBars} from 'react-icons/fa';
import {IoFilterSharp} from 'react-icons/io5';
import {LuLayoutGrid} from 'react-icons/lu';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
	selectAppliedFiltersCount,
	setViewMode,
} from '../../redux/slices/claimsFiltersSlice';
import {VIEW_MODES} from '../../utility/constant';

interface PageHeaderProps {
	heading: string;
	subHeading?: string;
	showFilter?: boolean;
	showViewSwitcher?: boolean;
	searchPlaceholder?: string;
	totalCount?: number | string;
	onFilterClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	heading,
	subHeading,
	showFilter = true,
	showViewSwitcher = true,
	searchPlaceholder,
	totalCount = true,
	onFilterClick,
}) => {
	const dispatch = useAppDispatch();
	const {viewMode} = useAppSelector((state) => state.claimsFilter);
	const appliedFiltersCount = useAppSelector(selectAppliedFiltersCount);

	const toggleViewMode = (mode: string) => {
		dispatch(setViewMode(mode));
	};

	return (
		<>
			<div className="mb-2">
				<h1 className="text-2xl font-semibold text-gray-900">{heading}</h1>
				<p className="text-gray-600 text-sm">{subHeading}</p>
			</div>
			<section className="flex justify-between items-center">
				<div className="flex gap-2 mb-2">
					{showFilter && (
						<button
							onClick={onFilterClick}
							className="text-slate-600 rounded-sm border border-slate-400 py-2 px-3 text-sm flex items-center gap-2 cursor-pointer hover:border-slate-700 hover:text-slate-900"
						>
							<IoFilterSharp /> Filters ({appliedFiltersCount})
						</button>
					)}
					<form>
						<div className="flex items-center gap-2">
							<input
								type="text"
								id="claimId"
								name="claimId"
								placeholder={searchPlaceholder}
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
				<div className="flex items-center gap-3">
					{totalCount && (
						<div>
							<p className="text-slate-700">2 results</p>
						</div>
					)}
					{showViewSwitcher && (
						<div className="flex gap-1 bg-brand-lighter rounded-sm p-1">
							<button
								onClick={() => toggleViewMode(VIEW_MODES.LIST)}
								className={`${VIEW_MODES.LIST === viewMode && 'bg-brand-light-hover'} hover:bg-brand-light-hover focus:bg-brand-light-hover p-2 rounded-sm cursor-pointer`}
							>
								<FaBars />
							</button>
							<button
								onClick={() => toggleViewMode(VIEW_MODES.GRID)}
								className={`${VIEW_MODES.GRID === viewMode && 'bg-brand-light-hover'} hover:bg-brand-light-hover focus:bg-brand-light-hover p-2 rounded-sm cursor-pointer`}
							>
								<LuLayoutGrid />
							</button>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default PageHeader;
