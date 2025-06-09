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

const sampleClaims = [
	{
		id: 1,
		billNumber: 'BL-2024-001',
		customerId: {name: 'John Smith', mobileNumber: '+1-555-0123'},
		billDate: '2024-03-15',
		tyreCompany: 'Michelin',
		vehicleNumber: 'MH-12-AB-1234',
		claimStatusByCompany: 'accepted',
		finalClaimStatus: true,
		complaintDetails: 'Premature wear on front tyre',
		docketNumber: 'DOC-2024-001',
	},
	{
		id: 2,
		billNumber: 'BL-2024-002',
		customerId: {name: 'Sarah Johnson', mobileNumber: '+1-555-0456'},
		billDate: '2024-03-18',
		tyreCompany: 'Bridgestone',
		vehicleNumber: 'MH-14-CD-5678',
		claimStatusByCompany: 'pending',
		finalClaimStatus: false,
		complaintDetails: 'Sidewall damage within warranty period',
		docketNumber: 'DOC-2024-002',
	},
	{
		id: 3,
		billNumber: 'BL-2024-003',
		customerId: {name: 'Michael Brown', mobileNumber: '+1-555-0789'},
		billDate: '2024-03-20',
		tyreCompany: 'Continental',
		vehicleNumber: 'MH-16-EF-9012',
		claimStatusByCompany: 'rejected',
		finalClaimStatus: false,
		complaintDetails: 'Tread separation issue',
		docketNumber: 'DOC-2024-003',
	},
	{
		id: 4,
		billNumber: 'BL-2024-004',
		customerId: {name: 'Emily Davis', mobileNumber: '+1-555-0321'},
		billDate: '2024-03-22',
		tyreCompany: 'Goodyear',
		vehicleNumber: 'MH-18-GH-3456',
		claimStatusByCompany: 'accepted',
		finalClaimStatus: true,
		complaintDetails: 'Manufacturing defect in rubber compound',
		docketNumber: 'DOC-2024-004',
	},
	{
		id: 5,
		billNumber: 'BL-2024-005',
		customerId: {name: 'David Wilson', mobileNumber: '+1-555-0654'},
		billDate: '2024-03-25',
		tyreCompany: 'Pirelli',
		vehicleNumber: 'MH-20-IJ-7890',
		claimStatusByCompany: 'pending',
		finalClaimStatus: false,
		complaintDetails: 'Irregular wear pattern',
		docketNumber: 'DOC-2024-005',
	},
	{
		id: 6,
		billNumber: 'BL-2024-006',
		customerId: {name: 'Lisa Anderson', mobileNumber: '+1-555-0987'},
		billDate: '2024-03-28',
		tyreCompany: 'Michelin',
		vehicleNumber: 'MH-22-KL-1234',
		claimStatusByCompany: 'accepted',
		finalClaimStatus: true,
		complaintDetails: 'Valve stem failure',
		docketNumber: 'DOC-2024-006',
	},
	{
		id: 7,
		billNumber: 'BL-2024-007',
		customerId: {name: 'Robert Taylor', mobileNumber: '+1-555-0111'},
		billDate: '2024-03-30',
		tyreCompany: 'Bridgestone',
		vehicleNumber: 'MH-24-MN-2468',
		claimStatusByCompany: 'pending',
		finalClaimStatus: false,
		complaintDetails: 'Puncture resistance issue',
		docketNumber: 'DOC-2024-007',
	},
	{
		id: 8,
		billNumber: 'BL-2024-008',
		customerId: {name: 'Jessica White', mobileNumber: '+1-555-0222'},
		billDate: '2024-04-01',
		tyreCompany: 'Continental',
		vehicleNumber: 'MH-26-OP-3579',
		claimStatusByCompany: 'accepted',
		finalClaimStatus: true,
		complaintDetails: 'Bead wire failure',
		docketNumber: 'DOC-2024-008',
	},
];

const GridViewContainer = () => {
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

	return (
		<div className="flex max-h-[calc(100vh_-_150px)] overflow-auto py-5 w-full relative">
			<div className="flex flex-wrap items-start gap-4">
				{sampleClaims.map((claim) => (
					<div
						key={claim.id}
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
										{claim.vehicleNumber}
									</p>
								</div>
								<p className="text-xs text-gray-600 font-medium truncate ml-2">
									{claim.tyreCompany}
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

			{sampleClaims.length === 0 && (
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
