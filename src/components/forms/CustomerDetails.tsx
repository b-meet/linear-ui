import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {useLocation} from 'react-router';
import {CustomerDetailsState} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';
import {apiAuth} from '../../api/services';
import {CustomerDetailsProps} from './types';
import {toast} from 'react-toastify';
import {API_ROUTES} from '../../utility/constant';

interface ValidationErrors {
	customerName?: string;
	customerNumber?: string;
	billDate?: string;
	billNumber?: string;
	docketNumber?: string;
	complaintDetails?: string;
}

const DEBOUNCE_DELAY = 500;

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
	details,
	onChange,
	onNext,
	onBack,
}) => {
	const [localDetails, setLocalDetails] = useState<CustomerDetailsState>({
		...details,
		leadRelation: details.leadRelation || 'new',
	});
	const [persistedDetails, setPersistedDetails] =
		useState<CustomerDetailsState | null>(null);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const {pathname} = useLocation();

	useEffect(() => {
		const initialFormState = {
			...details,
			leadRelation: details.leadRelation || 'new',
		};
		setLocalDetails(initialFormState);
		if (!persistedDetails) {
			setPersistedDetails(initialFormState);
		}
	}, [details, persistedDetails]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedOnChange = useCallback(
		debounce(
			(
				event: ChangeEvent<
					HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
				>
			) => {
				onChange(event);
			},
			DEBOUNCE_DELAY
		),
		[onChange]
	);

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const {name, value} = event.target;
		setLocalDetails((prevDetails) => ({
			...prevDetails,
			[name]: value,
		}));
		debouncedOnChange(event);
	};

	const validateForm = () => {
		const newErrors: ValidationErrors = {};
		if (!localDetails.customerName) {
			newErrors.customerName = 'Name is required';
		}
		if (!localDetails.customerNumber) {
			newErrors.customerNumber = 'Phone number is required';
		} else if (!/^\d{10}$/.test(localDetails.customerNumber)) {
			newErrors.customerNumber = 'Invalid phone number';
		}
		if (!localDetails.billDate) {
			newErrors.billDate = 'Bill date is required';
		}
		if (!localDetails.billNumber) {
			newErrors.billNumber = 'Bill number is required';
		}
		if (!localDetails.docketNumber) {
			newErrors.docketNumber = 'Docket number is required';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	const handleNext = async () => {
		const isValid = validateForm();
		if (isValid) {
			const hasChanges =
				JSON.stringify(localDetails) !== JSON.stringify(persistedDetails);

			if (hasChanges) {
				const claimId = pathname.split('/').pop();
				const tabId = 1;
				const payload = {
					name: localDetails.customerName,
					mobileNumber: localDetails.customerNumber,
					billNumber: localDetails.billNumber,
					billDate: localDetails.billDate,
					docketNumber: localDetails.docketNumber,
					leadRelation: localDetails.leadRelation,
					complaintDetails: localDetails.complaintDetails,
					additionalRemarks: localDetails.additionalRemarks,
				};
				try {
					await apiAuth.post(
						`${API_ROUTES.SAVE_APP}/${claimId}/${tabId}`,
						payload
					);
					toast.success('Customer Details saved successfully');
					setPersistedDetails(localDetails); // Update snapshot after successful save
					onNext();
				} catch (error) {
					toast.error('Something went wrong while saving customer details.');
					console.error('Error during API call:', error);
				}
			} else {
				onNext();
			}
		}
	};

	return (
		<section className="flex flex-col gap-2 h-full">
			<div className="bg-brand-lighter ">
				<h2 className="px-4 py-3">Customer Details</h2>
				<hr className="text-brand-light-hover" />
			</div>
			<article className="flex flex-col gap-3 justify-between h-full px-4">
				<div className="flex flex-col gap-3">
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="customerNumber">
								Phone Number*
							</label>
							<input
								className="custom-input"
								type="text"
								id="customerNumber"
								name="customerNumber"
								value={localDetails.customerNumber}
								onChange={handleChange}
							/>
							{errors.customerNumber && (
								<p className="text-red-500 text-xs">{errors.customerNumber}</p>
							)}
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="customerName">
								Name*
							</label>
							<input
								className="custom-input"
								type="text"
								id="customerName"
								name="customerName"
								value={localDetails.customerName}
								onChange={handleChange}
							/>
							{errors.customerName && (
								<p className="text-red-500 text-xs">{errors.customerName}</p>
							)}
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="billDate">
								Bill Date*
							</label>
							<input
								className="custom-input"
								type="date"
								id="billDate"
								name="billDate"
								max={new Date().toISOString().split('T')[0]}
								value={localDetails.billDate}
								onChange={handleChange}
							/>
							{errors.billDate && (
								<p className="text-red-500 text-xs">{errors.billDate}</p>
							)}
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="billNumber">
								Bill Number*
							</label>
							<input
								className="custom-input"
								type="text"
								id="billNumber"
								name="billNumber"
								value={localDetails.billNumber}
								onChange={handleChange}
							/>
							{errors.billNumber && (
								<p className="text-red-500 text-xs">{errors.billNumber}</p>
							)}
						</div>
					</div>
					<div className="flex gap-4 items-start">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="docketNumber">
								Docket Number*
							</label>
							<input
								className="custom-input"
								type="text"
								id="docketNumber"
								name="docketNumber"
								value={localDetails.docketNumber}
								onChange={handleChange}
							/>
							{errors.docketNumber && (
								<p className="text-red-500 text-xs">{errors.docketNumber}</p>
							)}
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="leadRelation">
								Lead Relation
							</label>
							<select
								name="leadRelation"
								id="leadRelation"
								className="custom-input h-ful py-1.5"
								value={localDetails.leadRelation}
								onChange={handleChange}
							>
								<option value="new">New customer</option>
								<option value="old">Old customer</option>
								<option value="other">Third party</option>
							</select>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm" htmlFor="complaintDetails">
							Complaint Details
						</label>
						<textarea
							className="custom-input h-28 max-h-28"
							id="complaintDetails"
							name="complaintDetails"
							value={localDetails.complaintDetails}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label className="text-sm" htmlFor="additionalRemarks">
							Additional Details
						</label>
						<textarea
							className="custom-input h-24 max-h-24"
							id="additionalRemarks"
							name="additionalRemarks"
							value={localDetails.additionalRemarks}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex items-center justify-end">
					<button
						className="bg-slate-400 text-white rounded-md py-2 px-4 cursor-pointer hover:bg-slate-500 mr-2"
						onClick={onBack}
					>
						Back
					</button>
					<button
						className="bg-brand-darker text-white rounded-md py-2 px-4 cursor-pointer hover:bg-brand-dark"
						onClick={handleNext}
					>
						Next
					</button>
				</div>
			</article>
		</section>
	);
};

export default CustomerDetails;
