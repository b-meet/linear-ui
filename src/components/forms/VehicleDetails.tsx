import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {VehicleDetailsState} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';

interface VehicleDetailsProps {
	details: VehicleDetailsState;
	onChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onNext: () => void;
}

const DEBOUNCE_DELAY = 500;

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
	details,
	onChange,
	onNext,
}) => {
	const [localDetails, setLocalDetails] =
		useState<VehicleDetailsState>(details);

	useEffect(() => {
		setLocalDetails(details);
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

	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	return (
		<section className="flex flex-col gap-3 justify-between h-full">
			<div className="flex flex-col gap-3">
				{/* Vehicle Number */}
				<div className="flex flex-col gap-1 flex-1">
					<label className="text-sm" htmlFor="vehicleNumber">
						Vehicle Number
					</label>
					<input
						className="custom-input"
						type="text"
						id="vehicleNumber"
						name="vehicleNumber"
						value={localDetails.vehicleNumber}
						onChange={handleChange}
					/>
				</div>
				{/* Type */}
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
				{/* Distance Covered */}
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
			<button
				className="bg-brand-darker text-white rounded-md py-2 px-4 hover:bg-brand-dark"
				onClick={onNext}
			>
				Save & Next
			</button>
		</section>
	);
};

export default VehicleDetails;
