import {useEffect} from 'react';
import {
	FaCalendarAlt,
	FaUser,
	FaPhone,
	FaFileAlt,
	FaCheckCircle,
	FaTimesCircle,
	FaClock,
	FaCar,
} from 'react-icons/fa';
import {useAppSelector, useAppDispatch} from '../../../hooks/redux';
import {fetchClaimsData} from '../../../redux/slices/claimsDataSlice';

const GridViewContainer = () => {
	const dispatch = useAppDispatch();
	const {claimsData, loading, error} = useAppSelector(
		(state) => state.claimsData
	);

	useEffect(() => {
		// Only fetch if we don't have data yet
		if (claimsData.length === 0 && !loading) {
			dispatch(fetchClaimsData());
		}
	}, [dispatch, claimsData.length, loading]);
	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'accepted':
				return <FaCheckCircle className="w-3 h-3 text-green-600" />;
			case 'rejected':
				return <FaTimesCircle className="w-3 h-3 text-red-600" />;
			case 'pending':
				return <FaClock className="w-3 h-3 text-yellow-600" />;
			default:
				return <FaClock className="w-3 h-3 text-gray-400" />;
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'accepted':
				return 'bg-green-50 text-green-700 border-green-200';
			case 'rejected':
				return 'bg-red-50 text-red-700 border-red-200';
			case 'pending':
				return 'bg-yellow-50 text-yellow-700 border-yellow-200';
			default:
				return 'bg-gray-50 text-gray-700 border-gray-200';
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	// Display error if there's an error
	if (error) {
		return (
			<div className="flex h-[calc(100vh_-_150px)] w-full items-center justify-center">
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

	// Display loading state
	if (loading) {
		return (
			<div className="flex h-[calc(100vh_-_150px)] w-full items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
					<p className="text-gray-600">Loading claims...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex max-h-[calc(100vh_-_150px)] overflow-auto w-full relative">
			<div className="flex flex-wrap items-start gap-4">
				{claimsData.map((claim) => (
					<div
						key={claim._id}
						className="bg-white min-w-[325px] rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden"
					>
						<div
							className={`h-1 ${claim.claimStatusByCompany === 'accepted' ? 'bg-green-500' : claim.claimStatusByCompany === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}
						></div>
						<div className="p-4">
							<div className="flex items-center justify-between mb-3">
								<h3 className="font-semibold text-sm text-gray-900">
									{claim.billNumber}
								</h3>
								<div className="flex items-center gap-2">
									<span
										className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.claimStatusByCompany)}`}
									>
										{getStatusIcon(claim.claimStatusByCompany)}
										<span className="ml-1.5 capitalize">
											{claim.claimStatusByCompany}
										</span>
									</span>
								</div>
							</div>

							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2">
									<FaUser className="w-4 h-4 text-gray-400" />
									<p className="text-sm font-medium text-gray-900 truncate">
										{claim.customerId.name}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<FaPhone className="w-3.5 h-3.5 text-gray-400" />
									<p className="text-xs text-gray-600">
										{claim.customerId.mobileNumber}
									</p>
								</div>
							</div>

							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2">
									<FaCar className="w-4 h-4 text-gray-400" />
									<p className="text-sm font-medium text-gray-900">
										{claim.vehicleNumber || 'N/A'}
									</p>
								</div>
								<p className="text-xs text-gray-600 font-medium truncate ml-2">
									{claim.tyreCompany || 'N/A'}
								</p>
							</div>

							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center gap-2">
									<FaCalendarAlt className="w-3.5 h-3.5 text-gray-400" />
									<p className="text-xs text-gray-600">
										{formatDate(claim.billDate)}
									</p>
								</div>
								<p className="text-xs text-gray-500">#{claim.docketNumber}</p>
							</div>

							<div className="border-t border-gray-100 pt-3">
								<div className="flex items-start gap-2">
									<FaFileAlt className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
									<p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
										{claim.complaintDetails}
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{claimsData.length === 0 && !loading && (
				<div className="text-center py-12">
					<FaFileAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						No claims found
					</h3>
					<p className="text-gray-500">
						Try adjusting your search criteria or filters.
					</p>
				</div>
			)}
		</div>
	);
};

export default GridViewContainer;
