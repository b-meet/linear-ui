/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import GlobalModal from '../global/GlobalModal';

type Customer = {
	_id: string;
	userId: string;
	name: string;
	mobileNumber: string;
	createdAt: string;
};

interface EditCustomerModalProps {
	isOpen: boolean;
	onClose: () => void;
	customer: Customer;
	onUpdate: (updatedCustomer: Customer) => void;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
	isOpen,
	onClose,
	customer,
	onUpdate,
}) => {
	const [formData, setFormData] = useState({
		name: customer.name,
		mobileNumber: customer.mobileNumber,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			// API call to update customer
			// const response = await apiAuth.put(`${API_ROUTES.UPDATE_CUSTOMER}/${customer._id}`, formData);

			// Update the customer in the parent component
			const updatedCustomer = {
				...customer,
				...formData,
			};

			onUpdate(updatedCustomer);
			onClose();
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					err.message ||
					'Failed to update customer'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<GlobalModal isOpen={isOpen} onClose={onClose} title="Edit Customer">
			<form onSubmit={handleSubmit}>
				{error && (
					<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
						{error}
					</div>
				)}

				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Customer Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="mobileNumber"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Mobile Number
					</label>
					<input
						type="text"
						id="mobileNumber"
						name="mobileNumber"
						value={formData.mobileNumber}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div className="flex justify-end gap-2 mt-6">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 text-sm font-medium text-white bg-brand rounded-md hover:bg-brand-darker cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
						disabled={loading}
					>
						{loading ? 'Saving...' : 'Save Changes'}
					</button>
				</div>
			</form>
		</GlobalModal>
	);
};

export default EditCustomerModal;
