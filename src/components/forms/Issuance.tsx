import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {IssuanceState} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';

interface IssuanceProps {
	details: IssuanceState;
	onChange: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onNext: () => void;
}

const DEBOUNCE_DELAY = 500;

const Issuance: React.FC<IssuanceProps> = ({details, onChange, onNext}) => {
	const [localDetails, setLocalDetails] = useState<IssuanceState>(details);

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
				<div className="flex flex-col gap-1 flex-1">
					<label className="text-sm" htmlFor="depreciationAmt">
						Depreciation Amount
					</label>
					<input
						className="custom-input"
						type="text" // Use text, can add validation for number later
						id="depreciationAmt"
						name="depreciationAmt"
						value={localDetails.depreciationAmt}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-1 flex-1">
					<label className="text-sm" htmlFor="claimStatusByCompany">
						Claim Status (Company)
					</label>
					<input
						className="custom-input"
						type="text"
						id="claimStatusByCompany"
						name="claimStatusByCompany"
						value={localDetails.claimStatusByCompany}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-1 flex-1">
					<label className="text-sm" htmlFor="returnToCustomerDt">
						Return To Customer Date
					</label>
					<input
						className="custom-input"
						type="date"
						id="returnToCustomerDt"
						name="returnToCustomerDt"
						value={localDetails.returnToCustomerDt ?? ''}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-1 flex-1">
					<label className="text-sm" htmlFor="finalClaimStatus">
						Final Claim Status
					</label>
					<input
						className="custom-input"
						type="text"
						id="finalClaimStatus"
						name="finalClaimStatus"
						value={localDetails.finalClaimStatus}
						onChange={handleChange}
					/>
				</div>
			</div>
			<button
				className="bg-brand-darker text-white rounded-md py-2 px-4 hover:bg-brand-dark"
				onClick={onNext}
			>
				Save
			</button>
		</section>
	);
};

export default Issuance;
