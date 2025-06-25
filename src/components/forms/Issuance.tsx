import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {IssuanceState, resetForm} from '../../redux/slices/claimsFormSlice';
import {debounce} from '../../utility/debounce';
import {apiAuth} from '../../api/services';
import {toast} from 'react-toastify';
import {storageServices} from '../../utility/storageServices';
import {STORAGE_SERVICES} from '../../type';
import {API_ROUTES} from '../../utility/constant';

interface IssuanceProps {
	details: IssuanceState;
	onChange: (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	onNext: () => void;
	onBack: () => void;
}

const DEBOUNCE_DELAY = 500;

const Issuance: React.FC<IssuanceProps> = ({
	details,
	onChange,
	onNext,
	onBack,
}) => {
	const [localDetails, setLocalDetails] = useState<IssuanceState>(details);
	const dispatch = useDispatch();

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

	const handleCheck = () => {
		setLocalDetails((prevDetails) => ({
			...prevDetails,
			finalClaimStatus: !localDetails.finalClaimStatus,
		}));
	};

	useEffect(() => {
		return () => {
			debouncedOnChange.cancel();
		};
	}, [debouncedOnChange]);

	const handleSave = async () => {
		const claimId = window.location.pathname.split('/').pop();
		const tabId = 4;
		const payload = {
			depreciationAmt: localDetails.depreciationAmt,
			claimStatusByCompany: localDetails.claimStatusByCompany,
			returnToCustomerDt: localDetails.returnToCustomerDt,
			finalClaimStatus: localDetails.finalClaimStatus,
		};
		try {
			await apiAuth.post(`${API_ROUTES.SAVE_APP}/${claimId}/${tabId}`, payload);
			toast.success('Issuance Details saved successfully');
			dispatch(resetForm());
			storageServices.set(STORAGE_SERVICES.SESSION, 'claimsForm'); // Attempt to clear session storage
			onNext();
		} catch (error) {
			toast.error('Something went wrong while saving issuance details');
			console.error('Error during API call:', error);
		}
	};

	return (
		<section className="flex flex-col gap-3 justify-between h-full">
			<div className="bg-brand-lighter">
				<h2 className="px-4 py-3">Issuance</h2>
				<hr className="text-brand-light-hover" />
			</div>
			<article className="flex flex-col gap-3 justify-between h-full px-4">
				<div className="flex flex-col gap-3">
					<div className="flex gap-4">
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="depreciationAmt">
								Depreciation Amount
							</label>
							<input
								className="custom-input"
								type="text"
								id="depreciationAmt"
								name="depreciationAmt"
								value={localDetails.depreciationAmt}
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-1 flex-1">
							<label className="text-sm" htmlFor="claimStatusByCompany">
								Claim Status (By Company)
							</label>
							<select
								className="custom-input py-1.5 px-2"
								id="claimStatusByCompany"
								name="claimStatusByCompany"
								value={localDetails.claimStatusByCompany}
								onChange={handleChange}
							>
								<option value="pending">pending</option>
								<option value="rejected">rejected</option>
								<option value="accepted">accepted</option>
							</select>
						</div>
					</div>
					<div className="flex gap-4">
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
						<div className="flex-1"></div>
					</div>
					<div className="flex flex-col gap-1 mt-4">
						<span className="text-sm">Final Claim Status</span>
						<label className="h-full inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								className="sr-only peer"
								id="finalClaimStatus"
								name="finalClaimStatus"
								checked={localDetails.finalClaimStatus}
								onChange={handleCheck}
							/>
							<div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-3 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
							<span
								className={`ms-3 text-sm font-medium ${localDetails.finalClaimStatus ? 'text-gray-900' : 'text-gray-400'}`}
							>
								{localDetails.finalClaimStatus ? 'Completed' : 'In Progress'}
							</span>
						</label>
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
						onClick={handleSave}
					>
						Save
					</button>
				</div>
			</article>
		</section>
	);
};

export default Issuance;
