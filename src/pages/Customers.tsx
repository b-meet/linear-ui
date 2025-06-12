import {useEffect, useState} from 'react';
import {apiAuth} from '../api/services';
import {API_ROUTES} from '../utility/constant';
import EditCustomerModal from '../components/customer/EditCustomer';
import {useNavigate} from 'react-router';
import {ROUTES} from '../routing/routes';
import PageHeader from '../components/pageHeader/PageHeader';

type Customer = {
	_id: string;
	userId: string;
	name: string;
	mobileNumber: string;
	createdAt: string;
};

const Customers = () => {
	const navigate = useNavigate();
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

	// Edit modal state
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				const response = await apiAuth.get(API_ROUTES.GET_CUSTOMER);
				setCustomers(response.data);
			} catch (err: any) {
				setError(err.message || 'Failed to fetch customers');
			} finally {
				setLoading(false);
			}
		};

		fetchCustomers();
	}, []);

	const handleOpenEditModal = (customer: Customer) => {
		setEditingCustomer(customer);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setEditingCustomer(null);
	};

	const handleUpdateCustomer = (updatedCustomer: Customer) => {
		setCustomers(
			customers.map((c) =>
				c._id === updatedCustomer._id ? updatedCustomer : c
			)
		);
		setExpandedCustomer(updatedCustomer._id);
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const toggleExpand = (customerId: string) => {
		if (expandedCustomer === customerId) {
			setExpandedCustomer(null);
		} else {
			setExpandedCustomer(customerId);
		}
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase();
	};

	const handleCheckHistory = (id: string) => {
		console.log(id);
		navigate(ROUTES.CLAIMS);
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[300px]">
				<div className="flex flex-col items-center">
					<div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
					<p className="mt-4 text-gray-600">Loading customers...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 bg-red-50 border border-red-200 rounded-lg">
				<div className="flex items-center text-red-600 mb-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
					<p className="font-medium">Error</p>
				</div>
				<p>{error}</p>
				<button
					className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
					onClick={() => window.location.reload()}
				>
					Try Again
				</button>
			</div>
		);
	}

	return (
		<>
			<PageHeader
				heading="Customers"
				totalCount={customers.length}
				searchPlaceholder="Search by customer name or mobile number"
				showFilter={false}
				showViewSwitcher={false}
			/>
			<div className="divide-green-200 h-[calc(75%)]">
				{customers.length > 0 ? (
					customers.map((customer) => (
						<div
							key={customer._id}
							className="hover:bg-gray-50 transition-colors border-b-1 border-brand-lighter"
						>
							<div
								className="p-4 cursor-pointer flex flex-col justify-between gap-2"
								onClick={() => toggleExpand(customer._id)}
							>
								<div className="flex justify-between items-center w-full">
									<div className="flex items-center gap-3">
										<div className="bg-blue-100 text-blue-800 h-10 w-10 rounded-full flex items-center justify-center font-semibold">
											{getInitials(customer?.name?.trim())}
										</div>
										<div>
											<h3 className="text-lg font-medium text-gray-800">
												{customer?.name?.trim()}
											</h3>
											<div className="flex items-center text-sm text-gray-500">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-3 w-3 mr-1"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
													/>
												</svg>
												{customer.mobileNumber}
											</div>
										</div>
									</div>
									<div className="flex flex-col items-end gap-2">
										<div className="text-sm text-gray-500 flex items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-3 w-3 mr-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
												/>
											</svg>
											Customer Joined on: {formatDate(customer.createdAt)}
										</div>
										<div className="flex gap-2">
											<button
												className="px-3 py-1 text-sm cursor-pointer bg-brand-lighter text-slate-600 hover:text-slate-50 hover:bg-brand rounded-md transition-colors"
												onClick={() => handleOpenEditModal(customer)}
											>
												Edit Details
											</button>
											<button
												className="px-3 py-1 text-sm cursor-pointer bg-brand-lighter text-slate-600 hover:text-slate-50 hover:bg-brand rounded-md transition-colors"
												onClick={() => handleCheckHistory(customer._id)}
											>
												View History
											</button>
											<button
												className="px-3 py-1 text-sm cursor-pointer bg-brand-lighter text-slate-600 hover:text-slate-50 hover:bg-brand rounded-md transition-colors"
												onClick={() => {
													const phone = customer.mobileNumber.replace(
														/\D/g,
														''
													);
													const message = encodeURIComponent(
														`Hi ${customer.name}, This is a reminder from our service.`
													);
													window.open(
														`https://wa.me/${phone}?text=${message}`,
														'_blank'
													);
												}}
											>
												Send Message
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="h-[calc(100%_-_135px)] grid place-items-center">
						<div className="p-8 text-center">
							<div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-8 w-8 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-gray-800">
								No customers found
							</h3>
							<p className="text-gray-500 mt-1">
								Try adjusting your search criteria
							</p>
						</div>
					</div>
				)}
			</div>
			{/* Edit Customer Modal */}
			{editingCustomer && (
				<EditCustomerModal
					isOpen={isEditModalOpen}
					onClose={handleCloseEditModal}
					customer={editingCustomer}
					onUpdate={handleUpdateCustomer}
				/>
			)}
		</>
	);
};

export default Customers;
