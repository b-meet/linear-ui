import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {VehicleDetailsState} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';
import {apiAuth} from '../../api/services';
import {toast} from 'react-toastify';
import {API_ROUTES} from '../../utility/constant';

interface ValidationErrors {
	vehicleNumber?: string;
}

interface VehicleDetailsProps {
	details: VehicleDetailsState;
	onChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onNext: () => void;
	onBack: () => void;
}

const DEBOUNCE_DELAY = 500;

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
	details,
	onChange,
	onNext,
	onBack,
}) => {
	const [localDetails, setLocalDetails] =
		useState<VehicleDetailsState>(details);
	const [persistedDetails, setPersistedDetails] =
		useState<VehicleDetailsState | null>(null);
	const [errors, setErrors] = useState<ValidationErrors>({});

	useEffect(() => {
		const initialFormState = {...details};
		setLocalDetails(initialFormState);
		if (!persistedDetails) {
			setPersistedDetails(initialFormState);
		}
	}, [details, persistedDetails]);

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
		if (!localDetails.vehicleNumber) {
			newErrors.vehicleNumber = 'Vehicle number is required';
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
				const claimId = window.location.pathname.split('/').pop();
				const tabId = 3;
				const payload = {
					vehicleNumber: localDetails.vehicleNumber,
					vehicleType: localDetails.type,
					distanceCovered: localDetails.distanceCovered,
				};
				try {
					await apiAuth.post(
						`${API_ROUTES.SAVE_APP}/${claimId}/${tabId}`,
						payload
					);
					toast.success('Vehicle Details saved successfully');
					setPersistedDetails(localDetails); // Update snapshot after successful save
					onNext();
				} catch (error) {
					toast.error('Something went wrong while saving vehicle details.');
					console.error('Error during API call:', error);
				}
			} else {
				onNext();
			}
		}
	};

	return (
		<section className="flex flex-col gap-3 h-full">
			<div className="bg-brand-lighter">
				<h2 className="px-4 py-3">Vehicle Details</h2>
				<hr className="text-brand-light-hover" />
			</div>
			<article className="flex flex-col gap-3 justify-between h-full px-4">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1 flex-1">
						<label className="text-sm" htmlFor="vehicleNumber">
							Vehicle Number*
						</label>
						<input
							className="custom-input"
							type="text"
							id="vehicleNumber"
							name="vehicleNumber"
							value={localDetails.vehicleNumber}
							onChange={handleChange}
						/>
						{errors.vehicleNumber && (
							<p className="text-red-500 text-xs">{errors.vehicleNumber}</p>
						)}
					</div>
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="type">
								Type (e.g., Car, Truck)
							</label>
							<input
								className="custom-input"
								type="text"
								id="type"
								name="type"
								value={localDetails.type}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="distanceCovered">
								Distance Covered (km)
							</label>
							<input
								className="custom-input"
								type="text"
								id="distanceCovered"
								name="distanceCovered"
								value={localDetails.distanceCovered}
								onChange={handleChange}
							/>
						</div>
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

export default VehicleDetails;
