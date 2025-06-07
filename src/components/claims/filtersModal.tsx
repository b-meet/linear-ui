import React, {useState} from 'react';
import {BiCalendar, BiSearchAlt2} from 'react-icons/bi';
import {CgClose} from 'react-icons/cg';
import {FiFileText, FiFilter, FiRotateCcw} from 'react-icons/fi';

interface ClaimFilters {
	claimStatusByCompany?: string[] | string; // Updated to allow both array and string
	tyreCompany?: string;
	billDateFrom?: string;
	billDateTo?: string;
}

interface ClaimFilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onApplyFilters: (filters: ClaimFilters) => void;
	initialFilters?: ClaimFilters;
}

const ClaimFilterModal: React.FC<ClaimFilterModalProps> = ({
	isOpen,
	onClose,
	onApplyFilters,
	initialFilters = {},
}) => {
	const [filters, setFilters] = useState<ClaimFilters>({
		claimStatusByCompany: [],
		tyreCompany: '',
		billDateFrom: '',
		billDateTo: '',
		...initialFilters,
	});

	const claimStatusOptions = [
		{value: 'accepted', label: 'Accepted'},
		{value: 'rejected', label: 'Rejected'},
		{value: 'pending', label: 'Pending'},
	];

	// Updated to handle both string and array values
	const handleInputChange = (
		field: keyof ClaimFilters,
		value: string | string[]
	) => {
		setFilters((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleReset = (): void => {
		setFilters({
			claimStatusByCompany: [],
			tyreCompany: '',
			billDateFrom: '',
			billDateTo: '',
		});
	};

	const handleApply = (): void => {
		const activeFilters = Object.entries(filters).reduce(
			(acc, [key, value]) => {
				if (value !== '' && value !== null && value !== undefined) {
					// For arrays, only include if not empty
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

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
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

				<div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-180px)]">
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-sm font-medium text-gray-700">
							<BiCalendar className="w-4 h-4" />
							Bill Date Range
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="relative">
								<input
									type="date"
									value={filters.billDateFrom || ''}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleInputChange('billDateFrom', e.target.value)
									}
									className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
								/>
								<label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
									From
								</label>
							</div>
							<div className="relative">
								<input
									type="date"
									value={filters.billDateTo || ''}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleInputChange('billDateTo', e.target.value)
									}
									className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
								/>
								<label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">
									To
								</label>
							</div>
						</div>
					</div>
					<div className="space-y-4">
						<div className="flex items-center gap-2 text-sm font-medium text-gray-700"></div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="flex gap-2 text-sm font-medium text-gray-700 mb-2">
									<FiFileText className="w-4 h-4" />
									Claim Status
								</label>
								<div className="flex flex-wrap gap-2">
									{claimStatusOptions.map((option) => (
										<label
											key={option.value}
											className={`
                        inline-flex items-center px-4 py-2 rounded-xl border transition-all cursor-pointer text-sm font-medium
                        ${
													(
														Array.isArray(filters.claimStatusByCompany)
															? filters.claimStatusByCompany.includes(
																	option.value
																)
															: filters.claimStatusByCompany === option.value
													)
														? 'bg-brand text-white border-brand shadow-md'
														: 'bg-white text-gray-700 border-gray-200 hover:border-brand hover:bg-brand-lighter'
												}
                      `}
										>
											<input
												type="checkbox"
												className="sr-only"
												checked={
													Array.isArray(filters.claimStatusByCompany)
														? filters.claimStatusByCompany.includes(
																option.value
															)
														: filters.claimStatusByCompany === option.value
												}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
													const currentValues = Array.isArray(
														filters.claimStatusByCompany
													)
														? filters.claimStatusByCompany
														: filters.claimStatusByCompany
															? [filters.claimStatusByCompany]
															: [];
													let newValues: string[];
													if (e.target.checked) {
														newValues = [...currentValues, option.value];
													} else {
														newValues = currentValues.filter(
															(val) => val !== option.value
														);
													}

													handleInputChange('claimStatusByCompany', newValues);
												}}
											/>
											{option.label}
										</label>
									))}
								</div>
							</div>
							<div>
								<input
									type="text"
									value={filters.tyreCompany || ''}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleInputChange('tyreCompany', e.target.value)
									}
									placeholder="Tyre Company"
									className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
								/>
							</div>
						</div>
					</div>
				</div>

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
							className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors font-medium"
						>
							Cancel
						</button>
						<button
							onClick={handleApply}
							type="button"
							className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm"
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
