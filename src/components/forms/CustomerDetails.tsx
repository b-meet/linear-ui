import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {CustomerDetailsState} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';

interface CustomerDetailsProps {
	details: CustomerDetailsState;
	onChange: (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	onNext: () => void;
	onBack: () => void;
}

const DEBOUNCE_DELAY = 500;

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
	details,
	onChange,
	onNext,
	onBack,
}) => {
	const [localDetails, setLocalDetails] =
		useState<CustomerDetailsState>(details);

	useEffect(() => {
		setLocalDetails(details);
	}, [details]);

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

	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	return (
		<section className="flex flex-col gap-3 h-full">
			<div className="bg-brand-lighter ">
				<h2 className="px-4 py-3">Customer Details</h2>
				<hr className="text-brand-light-hover" />
			</div>
			<article className="flex flex-col gap-3 justify-between h-full px-4">
				<div className="flex flex-col gap-3">
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="customerName">
								Name
							</label>
							<input
								className="custom-input"
								type="text"
								id="customerName"
								name="customerName"
								value={localDetails.customerName}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="customerNumber">
								Number
							</label>
							<input
								className="custom-input"
								type="text"
								id="customerNumber"
								name="customerNumber"
								value={localDetails.customerNumber}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="billDate">
								Bill Date
							</label>
							<input
								className="custom-input"
								type="date"
								id="billDate"
								name="billDate"
								value={localDetails.billDate}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="billNumber">
								Bill Number
							</label>
							<input
								className="custom-input"
								type="text"
								id="billNumber"
								name="billNumber"
								value={localDetails.billNumber}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="docketNumber">
								Docket Number
							</label>
							<input
								className="custom-input"
								type="text"
								id="docketNumber"
								name="docketNumber"
								value={localDetails.docketNumber}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="leadRelation">
								Lead Relation
							</label>
							<select
								name="leadRelation"
								id="leadRelation"
								className="custom-input h-full"
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
						className="bg-slate-400 text-white rounded-md py-2 px-4 hover:bg-slate-500 mr-2"
						onClick={onBack}
					>
						Back
					</button>
					<button
						className="bg-brand-darker text-white rounded-md py-2 px-4 hover:bg-brand-dark"
						onClick={onNext}
					>
						Save & Next
					</button>
				</div>
			</article>
		</section>
	);
};

export default CustomerDetails;
