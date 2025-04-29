import {useState, useEffect, useCallback, useRef, ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
	initializeForm, // Renamed action
	updateFormField, // Renamed action
	selectClaimsForm, // Selector for the whole form
	selectClaimsCustomerDetails, // Selector for the customer details part
	ClaimsFormState, // Type for the whole form state
	CustomerDetailsState, // Type for the customer details part
} from '../redux/slices/claimsFormSlice'; // Import from the new slice
import {storageServices} from '../utility/storageServices';
import {STORAGE_SERVICES} from '../type';
import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router';

const CLAIMS_FORM_STORAGE_KEY = 'claimsFormData'; // Renamed storage key
const DEBOUNCE_DELAY = 500;

const AddClaims = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	// Select the relevant part for local state and inputs
	const customerDetails = useAppSelector(selectClaimsCustomerDetails);
	// Select the whole form state for saving
	const fullFormState = useAppSelector(selectClaimsForm);
	const [localDetails, setLocalDetails] =
		useState<CustomerDetailsState>(customerDetails);
	const debounceTimeoutRef = useRef<number | null>(null);

	// Initialize the entire form state from sessionStorage
	useEffect(() => {
		const savedData = storageServices.get(
			STORAGE_SERVICES.SESSION,
			CLAIMS_FORM_STORAGE_KEY // Use new key
		);
		if (savedData) {
			// Dispatch initializeForm with the full saved state
			dispatch(initializeForm(savedData as ClaimsFormState));
		}
	}, [dispatch]);

	// Sync Redux customerDetails part changes back to local state
	useEffect(() => {
		setLocalDetails(customerDetails);
	}, [customerDetails]);

	// Save the latest *entire* Redux form state to sessionStorage whenever it changes
	useEffect(() => {
		storageServices.set(
			STORAGE_SERVICES.SESSION,
			CLAIMS_FORM_STORAGE_KEY, // Use new key
			fullFormState // Save the whole form state
		);
	}, [fullFormState]); // Depend on the full form state

	// Handle input changes: update local state immediately, debounce Redux update
	const handleInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const {name, value} = e.target;

			// Update local state for responsive UI
			setLocalDetails((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear previous debounce timeout
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}

			// Set new timeout to dispatch Redux action with field path
			debounceTimeoutRef.current = setTimeout(() => {
				// Construct the field path (e.g., "customerDetails.customerName")
				const fieldPath = `customerDetails.${name}`;
				dispatch(updateFormField({fieldPath, value})); // Use updateFormField
			}, DEBOUNCE_DELAY);
		},
		[dispatch]
	);

	const handleStepBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, []);

	return (
		<>
			<button
				onClick={handleStepBack}
				className="flex items-center gap-2 text-slate-700 px-3 py-0.5 rounded-md bg-slate-100 cursor-pointer hover:text-slate-900 hover:bg-gray-200 mb-4"
			>
				<FaArrowLeft className="text-xs" />
				<h1 className="text-xl font-medium">Add Claims</h1>
			</button>
			<section className="flex gap-4 justify-between">
				<div className="flex-1 max-w-48">
					<ul className="flex flex-col gap-2 bg-white shadow-sm rounded-md p-4">
						<li className="bg-brand-lighter p-2 rounded-md">
							Customer details
						</li>
						<li className="bg-brand-lighter p-2 rounded-md">Tyre details</li>
						<li className="bg-brand-lighter p-2 rounded-md">Vehicle details</li>
						<li className="bg-brand-lighter p-2 rounded-md">Issuance</li>
					</ul>
				</div>
				<div className="flex-2 bg-white shadow-sm rounded-md p-4">
					<div>
						<label htmlFor="customerName">Name</label>
						<input
							className="custom-input"
							type="text"
							id="customerName"
							name="customerName"
							value={localDetails.customerName}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="customerNumber">Number</label>
						<input
							className="custom-input"
							type="text"
							id="customerNumber"
							name="customerNumber"
							value={localDetails.customerNumber}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="billDate">Bill Date</label>
						<input
							className="custom-input"
							type="date"
							id="billDate"
							name="billDate"
							value={localDetails.billDate}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="billNumber">Bill Number</label>
						<input
							className="custom-input"
							type="text"
							id="billNumber"
							name="billNumber"
							value={localDetails.billNumber}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default AddClaims;
