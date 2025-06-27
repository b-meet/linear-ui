/* eslint-disable @typescript-eslint/no-explicit-any */
import {useCallback, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router';

import PageHeader from '../components/pageHeader/PageHeader';
import EditCustomerModal from '../components/customer/EditCustomer';
import ErrorCustomer from '../components/customer/ErrorCustomer';
import LoadingCustomer from '../components/customer/LoadingCustomer';
import NoResultsFound from '../components/customer/NoResultsfound';

import {apiAuth} from '../api/services';
import {API_ROUTES} from '../utility/constant';
import {formatDate, getInitials} from '../utility/methods';
import {ICustomerResponse} from '../type';
import {ROUTES} from '../routing/routes';

type Customer = {
	_id: string;
	userId: string;
	name: string;
	mobileNumber: string;
	createdAt: string;
};

const Customers = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [search, setSearch] = useState('');
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

	useEffect(() => {
		const initial =
			searchParams.get('name') || searchParams.get('mobile') || '';
		setSearch(initial);
	}, [searchParams]);

	const handleSearchSubmit = () => {
		const queryParams = new URLSearchParams();
		if (search.trim()) {
			const isMobile = /^[0-9]+$/.test(search);
			queryParams.set(isMobile ? 'mobile' : 'name', search.trim());
		}
		navigate(`?${queryParams.toString()}`);
	};

	const fetchCustomers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const name = searchParams.get('name') || '';
			const mobile = searchParams.get('mobile') || '';
			const query = new URLSearchParams();
			if (name) query.append('name', name);
			if (mobile) query.append('mobile', mobile);

			const url = `${API_ROUTES.GET_CUSTOMER}${query.toString() ? `?${query}` : ''}`;
			const response: ICustomerResponse = await apiAuth.get(url);
			setCustomers(response.data);
		} catch (err: any) {
			setError(err.message || 'Failed to fetch customers');
		} finally {
			setLoading(false);
		}
	}, [searchParams]);

	useEffect(() => {
		fetchCustomers();
	}, [fetchCustomers]);

	const handleOpenEditModal = (customer: Customer) => {
		setEditingCustomer(customer);
		setIsEditModalOpen(true);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
		setEditingCustomer(null);
	};

	const handleUpdateCustomer = (updatedCustomer: Customer) => {
		setCustomers((prev) =>
			prev.map((c) => (c._id === updatedCustomer._id ? updatedCustomer : c))
		);
	};

	const handleCheckHistory = (id: string) => {
		console.log(id);
		navigate(ROUTES.CLAIMS);
	};

	if (loading) return <LoadingCustomer />;
	if (error) return <ErrorCustomer error={error} />;

	return (
		<>
			<PageHeader
				heading="Customers"
				totalCount={customers.length}
				searchPlaceholder="Search by customer name or mobile number"
				showFilter={false}
				showViewSwitcher={false}
				searchValue={search}
				onSearchInputChange={setSearch}
				onSearchSubmit={handleSearchSubmit}
			/>

			<div className="divide-green-200 h-[calc(75%)]">
				{customers.length > 0 ? (
					customers.map((customer) => (
						<div
							key={customer._id}
							className="hover:bg-gray-50 transition-colors border-b-1 border-brand-lighter"
						>
							<div className="p-4 cursor-pointer flex flex-col justify-between gap-2">
								<div className="flex justify-between items-center w-full">
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
												className="px-3 py-1 text-sm cursor-pointer bg-brand-lighter text-slate-600 hover:text-white hover:bg-brand rounded-md"
												onClick={() => handleOpenEditModal(customer)}
											>
												Edit Details
											</button>
											<button
												className="px-3 py-1 text-sm cursor-pointer bg-brand-lighter text-slate-600 hover:text-white hover:bg-brand rounded-md"
												onClick={() => handleCheckHistory(customer._id)}
											>
												View History
											</button>
											<button
												className="px-3 py-1 text-sm cursor-pointer bg-brand-lighter text-slate-600 hover:text-white hover:bg-brand rounded-md"
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
					<NoResultsFound />
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
