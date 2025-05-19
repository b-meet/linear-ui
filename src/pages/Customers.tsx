import {useEffect, useState} from 'react';
import {apiAuth} from '../api/services';
import {API_ROUTES} from '../utility/constant';
import EditCustomerModal from '../components/customer/EditCustomer';

type Customer = {
	_id: string;
	userId: string;
	name: string;
	mobileNumber: string;
	createdAt: string;
};

const Customers = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortOption, setSortOption] = useState('newest');
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

	const sortedCustomers = [...customers].sort((a, b) => {
		if (sortOption === 'newest') {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		} else if (sortOption === 'oldest') {
			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		} else if (sortOption === 'name') {
			return a.name.localeCompare(b.name);
		}
		return 0;
	});

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
		<div className="max-w-6xl h-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="px-6 py-4 bg-brand flex justify-between items-center">
				<h1 className="text-xl font-bold text-white">Customers</h1>
				<span className="bg-brand-lighter text-slate-600 text-sm font-medium px-3 py-1 rounded-full">
					{customers.length} Total
				</span>
			</div>

			<div className="p-4 bg-white border-b border-gray-200 flex flex-col md:flex-row gap-4">
				<div className="relative flex-grow">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-gray-400"
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
					<input
						type="text"
						placeholder="Search customers..."
						className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<div className="flex gap-2">
					<div className="relative">
						<select
							className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							value={sortOption}
							onChange={(e) => setSortOption(e.target.value)}
						>
							<option value="newest">Newest First</option>
							<option value="oldest">Oldest First</option>
							<option value="name">Name (A-Z)</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<div className="divide-green-200 h-[calc(75%)]">
				{sortedCustomers.length > 0 ? (
					sortedCustomers.map((customer) => (
						<div
							key={customer._id}
							className="hover:bg-gray-50 transition-colors border-b-1 border-brand-lighter"
						>
							<div
								className="p-4 cursor-pointer flex items-center justify-between"
								onClick={() => toggleExpand(customer._id)}
							>
								<div className="flex items-center gap-3">
									<div className="bg-blue-100 text-blue-800 h-10 w-10 rounded-full flex items-center justify-center font-semibold">
										{getInitials(customer.name.trim())}
									</div>
									<div>
										<h3 className="text-lg font-medium text-gray-800">
											{customer.name.trim()}
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

								<div className="flex items-center gap-4">
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
										{formatDate(customer.createdAt)}
									</div>
									{expandedCustomer === customer._id ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									)}
								</div>
							</div>

							{expandedCustomer === customer._id && (
								<div className="px-4 pb-4 pt-1 pl-16 bg-gray-50">
									<div className="flex gap-4">
										<button
											className="px-3 py-1 text-sm cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
											onClick={() => handleOpenEditModal(customer)}
										>
											Edit Details
										</button>
										<button className="px-3 py-1 text-sm cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors">
											View Activity
										</button>
										<button
											className="px-3 py-1 text-sm cursor-pointer text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
											onClick={() => {
												const phone = customer.mobileNumber.replace(/\D/g, '');
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
									<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-gray-500">Customer since</p>
											<p className="font-medium">
												{new Date(customer.createdAt).toLocaleDateString()}
											</p>
										</div>
										<div>
											<p className="text-gray-500">Customer ID</p>
											<p className="font-medium text-gray-700">
												{customer._id.substring(0, 8)}...
											</p>
										</div>
									</div>
								</div>
							)}
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

			{customers.length > 0 && (
				<div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
					<div className="text-sm text-gray-700">
						Showing{' '}
						<span className="font-medium">{sortedCustomers.length}</span> of{' '}
						<span className="font-medium">{customers.length}</span> customers
					</div>
					<div className="flex gap-2">
						<button
							className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
							disabled={true}
						>
							Previous
						</button>
						<button
							className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
							disabled={true}
						>
							Next
						</button>
					</div>
				</div>
			)}

			{/* Edit Customer Modal */}
			{editingCustomer && (
				<EditCustomerModal
					isOpen={isEditModalOpen}
					onClose={handleCloseEditModal}
					customer={editingCustomer}
					onUpdate={handleUpdateCustomer}
				/>
			)}
		</div>
	);
};

export default Customers;
