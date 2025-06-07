import {BiCalendar, BiSearchAlt2} from 'react-icons/bi';
import {CgClose, CgOrganisation} from 'react-icons/cg';
import {FiFileText, FiFilter, FiRotateCcw} from 'react-icons/fi';
import {TYRE_COMPANIES} from '../../utility/constant';
import clsx from 'clsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {resetFilters, setFilter} from '../../redux/slices/claimsFiltersSlice';

export interface ClaimFilters {
	claimStatusByCompany?: string[] | string;
	tyreCompany?: string[] | string;
	billDateFrom?: string;
	billDateTo?: string;
}

interface ClaimFilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onApplyFilters: (filters: ClaimFilters) => void;
}

const ClaimFilterModal: React.FC<ClaimFilterModalProps> = ({
	isOpen,
	onClose,
	onApplyFilters,
}) => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector((state) => state.claimsFilter);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (field: keyof ClaimFilters, value: any) => {
		dispatch(setFilter({field, value}));
	};

	const handleArrayCheckboxChange = (
		field: keyof ClaimFilters,
		item: string,
		checked: boolean
	) => {
		const currentValue = filters[field];

		const currentValues = Array.isArray(currentValue)
			? currentValue
			: typeof currentValue === 'string' && currentValue
				? [currentValue]
				: [];

		const updated = checked
			? [...currentValues, item]
			: currentValues.filter((val) => val !== item);

		dispatch(setFilter({field, value: updated}));
	};

	const handleReset = () => {
		dispatch(resetFilters());
		onApplyFilters({});
		onClose();
	};

	const handleApply = () => {
		const activeFilters = Object.entries(filters).reduce(
			(acc, [key, value]) => {
				if (value !== '' && value !== null && value !== undefined) {
					if (Array.isArray(value) && value.length === 0) return acc;
					acc[key as keyof ClaimFilters] = value;
				}
				return acc;
			},
			{} as ClaimFilters
		);

		onApplyFilters(activeFilters);
		onClose();
	};

	if (!isOpen) return null;

	const claimStatusOptions = [
		{value: 'accepted', label: 'Accepted'},
		{value: 'rejected', label: 'Rejected'},
		{value: 'pending', label: 'Pending'},
	];

	const renderCheckboxGroup = (
		label: string,
		icon: React.ReactNode,
		field: keyof ClaimFilters,
		options: {value: string; label: string}[]
	) => (
		<div className="space-y-2">
			<label className="flex gap-2 text-sm font-medium text-gray-700 mb-2">
				{icon}
				{label}
			</label>
			<div className="flex flex-wrap gap-2">
				{options.map(({value, label}) => {
					const selected = Array.isArray(filters[field])
						? filters[field]?.includes(value)
						: filters[field] === value;
					return (
						<label
							key={value}
							className={clsx(
								'inline-flex items-center px-4 py-2 rounded-xl border transition-all cursor-pointer text-sm font-medium',
								selected
									? 'bg-brand text-white border-brand shadow-md'
									: 'bg-white text-gray-700 border-gray-200 hover:border-brand hover:bg-brand-lighter'
							)}
						>
							<input
								type="checkbox"
								className="sr-only"
								checked={selected}
								onChange={(e) =>
									handleArrayCheckboxChange(field, value, e.target.checked)
								}
							/>
							{label}
						</label>
					);
				})}
			</div>
		</div>
	);

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
							<FiFilter className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								Filter Claims
							</h2>
							<p className="text-sm text-gray-500">
								Refine your search results
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
						type="button"
					>
						<CgClose className="w-5 h-5 text-gray-500" />
					</button>
				</div>

				{/* Body */}
				<div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-180px)]">
					{/* Date Range */}
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
							<BiCalendar className="w-4 h-4" />
							Bill Date Range
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{['billDateFrom', 'billDateTo'].map((key, idx) => (
								<div className="relative" key={key}>
									<input
										type="date"
										value={filters[key as keyof ClaimFilters] || ''}
										onChange={(e) =>
											handleChange(key as keyof ClaimFilters, e.target.value)
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
									/>
									<label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
										{idx === 0 ? 'From' : 'To'}
									</label>
								</div>
							))}
						</div>
					</div>

					{/* Claim Status */}
					{renderCheckboxGroup(
						'Claim Status',
						<FiFileText className="w-4 h-4" />,
						'claimStatusByCompany',
						claimStatusOptions
					)}

					{/* Tyre Companies */}
					{renderCheckboxGroup(
						'Tyre Company',
						<CgOrganisation className="w-4 h-4" />,
						'tyreCompany',
						TYRE_COMPANIES.map((c) => ({value: c, label: c}))
					)}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between py-3 px-6 bg-gray-50 border-t border-gray-100">
					<button
						onClick={handleReset}
						type="button"
						className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
					>
						<FiRotateCcw className="w-4 h-4" />
						Reset
					</button>

					<div className="flex gap-3">
						<button
							onClick={onClose}
							type="button"
							className="px-6 py-2.5 cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors font-medium"
						>
							Cancel
						</button>
						<button
							onClick={handleApply}
							type="button"
							className="flex items-center gap-2 px-6 py-2.5 bg-brand hover:bg-brand-darker text-white rounded-lg transition-colors font-medium shadow-sm cursor-pointer"
						>
							<BiSearchAlt2 className="w-4 h-4" />
							Apply Filters
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClaimFilterModal;
