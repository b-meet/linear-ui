import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {TyreDetailsState} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';

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

	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	return (
		<section className="flex flex-col gap-3 justify-between h-full">
			<div className="flex flex-col gap-3">
				<div className="flex gap-4">
					<div className="flex flex-col gap-1 flex-1">
						<label className="text-sm" htmlFor="tyreCompany">
							Brand
						</label>
						<input
							className="custom-input"
							type="text" // Corrected type
							id="tyreCompany"
							name="tyreCompany"
							value={localDetails.tyreCompany}
							onChange={handleChange}
						/>
					</div>
					{/* Tyre Pattern */}
					<div className="flex flex-col gap-1 flex-1">
						<label className="text-sm" htmlFor="tyrePattern">
							Pattern
						</label>
						<input
							className="custom-input"
							type="text"
							id="tyrePattern"
							name="tyrePattern"
							value={localDetails.tyrePattern}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-col gap-1 flex-1">
						<label className="text-sm" htmlFor="tyreSize">
							Size
						</label>
						<input
							className="custom-input"
							type="text"
							id="tyreSize"
							name="tyreSize"
							value={localDetails.tyreSize}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col gap-1 flex-1">
						<label className="text-sm" htmlFor="tyreSerialNumber">
							Serial Number
						</label>
						<input
							className="custom-input"
							type="text"
							id="tyreSerialNumber"
							name="tyreSerialNumber"
							value={localDetails.tyreSerialNumber}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-col gap-1 flex-1">
						<label className="text-sm" htmlFor="warrentyDetails">
							Warranty Details
						</label>
						<input
							className="custom-input"
							type="text"
							id="warrentyDetails"
							name="warrentyDetails"
							value={localDetails.warrentyDetails}
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
					className="bg-slate-400 text-white rounded-md py-2 px-4 hover:bg-slate-500 mr-2"
					onClick={onBack}
				>
					Back
				</button>
				<button
					className="bg-brand-darker text-white rounded-md py-2 px-4"
					onClick={onNext}
				>
					Save & Next
				</button>
			</div>
		</section>
	);
};

export default TyreDetails;
