import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {TyreDetailsState} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';
import {apiAuth} from '../../api/services';
import {toast} from 'react-toastify';

interface ValidationErrors {
	warrentyDetails?: string;
	tyreSerialNumber?: string;
	tyreSize?: string;
	tyrePattern?: string;
}

interface TyreDetailsProps {
	details: TyreDetailsState;
	onChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onNext: () => void;
	onBack: () => void;
}

const DEBOUNCE_DELAY = 500;

const TyreDetails: React.FC<TyreDetailsProps> = ({
	details,
	onChange,
	onNext,
	onBack,
}) => {
	const [localDetails, setLocalDetails] = useState<TyreDetailsState>(details);
	const [errors, setErrors] = useState<ValidationErrors>({});

	useEffect(() => {
		setLocalDetails({
			...details,
			tyreSentDate: details.tyreSentDate ?? '',
		});
	}, [details]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedOnChange = useCallback(
		debounce((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			onChange(event);
		}, DEBOUNCE_DELAY),
		[onChange]
	);

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
		if (!localDetails.warrentyDetails) {
			newErrors.warrentyDetails = 'Warranty detail is required';
		}
		if (!localDetails.tyreSerialNumber) {
			newErrors.tyreSerialNumber = 'Serial number is required';
		}
		if (!localDetails.tyreSize) {
			newErrors.tyreSize = 'Tyre size is required';
		}
		if (!localDetails.tyrePattern) {
			newErrors.tyrePattern = 'Tyre pattern is required';
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
			const claimId = window.location.pathname.split('/').pop();
			const tabId = 2;
			const payload = {
				warrentyDetails: localDetails.warrentyDetails,
				tyreSerialNumber: localDetails.tyreSerialNumber,
				tyreSize: localDetails.tyreSize,
				tyrePattern: localDetails.tyrePattern,
				tyreCompany: localDetails.tyreCompany,
				tyreSentDate: localDetails.tyreSentDate,
				tyreSentThrough: localDetails.tyreSentThrough,
			};
			try {
				await apiAuth.post(`/api/claims/addClaim/${claimId}/${tabId}`, payload);
				toast.success('Tyre Details saved successfully');
				onNext();
			} catch (error) {
				toast.error('Something went wrong');
				console.error('Error during API call:', error);
			}
		}
	};

	return (
		<section className="flex flex-col gap-3 h-full">
			<div className="bg-brand-lighter">
				<h2 className="px-4 py-3">Tyre Details</h2>
				<hr className="text-brand-light-hover" />
			</div>
			<article className="flex flex-col gap-3 h-full justify-between px-4">
				<div className="flex flex-col gap-3">
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="warrentyDetails">
								Warranty Details*
							</label>
							<input
								className="custom-input"
								type="text"
								id="warrentyDetails"
								name="warrentyDetails"
								value={localDetails.warrentyDetails}
								onChange={handleChange}
							/>
							{errors.warrentyDetails && (
								<p className="text-red-500 text-xs">{errors.warrentyDetails}</p>
							)}
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="tyreSerialNumber">
								Serial Number*
							</label>
							<input
								className="custom-input"
								type="text"
								id="tyreSerialNumber"
								name="tyreSerialNumber"
								value={localDetails.tyreSerialNumber}
								onChange={handleChange}
							/>
							{errors.tyreSerialNumber && (
								<p className="text-red-500 text-xs">
									{errors.tyreSerialNumber}
								</p>
							)}
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="tyreSize">
								Size*
							</label>
							<input
								className="custom-input"
								type="text"
								id="tyreSize"
								name="tyreSize"
								value={localDetails.tyreSize}
								onChange={handleChange}
							/>
							{errors.tyreSize && (
								<p className="text-red-500 text-xs">{errors.tyreSize}</p>
							)}
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="tyrePattern">
								Pattern*
							</label>
							<input
								className="custom-input"
								type="text"
								id="tyrePattern"
								name="tyrePattern"
								value={localDetails.tyrePattern}
								onChange={handleChange}
							/>
							{errors.tyrePattern && (
								<p className="text-red-500 text-xs">{errors.tyrePattern}</p>
							)}
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="tyreCompany">
								Brand
							</label>
							<input
								className="custom-input"
								type="text"
								id="tyreCompany"
								name="tyreCompany"
								value={localDetails.tyreCompany}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="tyreSentDate">
								Tyre Sent Date
							</label>
							<input
								className="custom-input"
								type="date"
								id="tyreSentDate"
								name="tyreSentDate"
								value={localDetails.tyreSentDate ?? ''}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1 flex-1">
						<label className="text-sm" htmlFor="tyreSentThrough">
							Tyre Sent Through (Courier/Transporter)
						</label>
						<input
							className="custom-input"
							type="text"
							id="tyreSentThrough"
							name="tyreSentThrough"
							value={localDetails.tyreSentThrough}
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
						className="bg-brand-darker text-white rounded-md py-2 px-4 cursor-pointer"
						onClick={handleNext}
					>
						Next
					</button>
				</div>
			</article>
		</section>
	);
};

export default TyreDetails;
