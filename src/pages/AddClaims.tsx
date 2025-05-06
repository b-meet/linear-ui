import {useEffect, useCallback, ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
	initializeForm,
	updateFormField,
	selectClaimsForm,
	selectClaimsCustomerDetails,
	selectClaimsTyreDetails,
	selectClaimsVehicleDetails,
	selectClaimsIssuance,
	ClaimsFormState,
} from '../redux/slices/claimsFormSlice';
import {storageServices} from '../utility/storageServices';
import {FormSection, STORAGE_SERVICES} from '../type';
import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router';
import CustomerDetails from '../components/forms/CustomerDetails';
import TyreDetails from '../components/forms/TyreDetails';
import VehicleDetails from '../components/forms/VehicleDetails';
import Issuance from '../components/forms/Issuance';

const CLAIMS_FORM_STORAGE_KEY = 'claimsFormData';

const AddClaims = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const customerDetails = useAppSelector(selectClaimsCustomerDetails);
	const tyreDetails = useAppSelector(selectClaimsTyreDetails);
	const vehicleDetails = useAppSelector(selectClaimsVehicleDetails);
	const issuance = useAppSelector(selectClaimsIssuance);
	const fullFormState = useAppSelector(selectClaimsForm);
	const [activeSection, setActiveSection] =
		useState<FormSection>('customerDetails');

	const goToNextSection = useCallback(() => {
		switch (activeSection) {
			case 'customerDetails':
				setActiveSection('tyreDetails');
				break;
			case 'tyreDetails':
				setActiveSection('vehicleDetails');
				break;
			case 'vehicleDetails':
				setActiveSection('issuance');
				break;
			case 'issuance':
				navigate('/claims');
				break;
			default:
				break;
		}
	}, [activeSection, navigate]);

	const goToPreviousSection = useCallback(() => {
		switch (activeSection) {
			case 'tyreDetails':
				setActiveSection('customerDetails');
				break;
			case 'vehicleDetails':
				setActiveSection('tyreDetails');
				break;
			case 'issuance':
				setActiveSection('vehicleDetails');
				break;
			default:
				break;
		}
	}, [activeSection]);

	// Initialize the entire form state from sessionStorage
	useEffect(() => {
		const savedData = storageServices.get(
			STORAGE_SERVICES.SESSION,
			CLAIMS_FORM_STORAGE_KEY
		);
		if (savedData) {
			const initialState = {
				customerDetails: {
					customerName: '',
					customerNumber: '',
					billDate: '',
					billNumber: '',
					docketNumber: '',
					leadRelation: '',
					complaintDetails: '',
					additionalRemarks: '',
				},
				tyreDetails: {
					warrentyDetails: '',
					tyreSerialNumber: '',
					tyrePattern: '',
					tyreSize: '',
					tyreSentDate: null,
					tyreSentThrough: '',
					tyreCompany: '',
				},
				vehicleDetails: {
					vehicleNumber: '',
					type: '',
					distanceCovered: '',
				},
				issuance: {
					depreciationAmt: '',
					claimStatusByCompany: 'pending',
					returnToCustomerDt: null,
					finalClaimStatus: '',
				},
			};
			const mergedData = {...initialState, ...savedData};
			dispatch(initializeForm(mergedData as ClaimsFormState));
		}
	}, [dispatch]);

	// Save the latest *entire* Redux form state to sessionStorage whenever it changes
	useEffect(() => {
		if (fullFormState) {
			storageServices.set(
				STORAGE_SERVICES.SESSION,
				CLAIMS_FORM_STORAGE_KEY,
				fullFormState
			);
		}
	}, [fullFormState]);

	const createInputChangeHandler = useCallback(
		(section: FormSection) =>
			(
				e: ChangeEvent<
					HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
				>
			) => {
				const {name} = e.target;
				let {value}: {value: unknown} = e.target;
				const fieldPath = `${section}.${name}`;

				if (
					section === 'issuance' &&
					name === 'returnToCustomerDt' &&
					value === ''
				) {
					value = null;
				} else if (
					section === 'tyreDetails' &&
					name === 'tyreSentDate' &&
					value === ''
				) {
					value = null;
				}

				dispatch(updateFormField({fieldPath, value}));
			},
		[dispatch]
	);

	const handleCustomerDetailsChange =
		createInputChangeHandler('customerDetails');
	const handleTyreDetailsChange = createInputChangeHandler('tyreDetails');
	const handleVehicleDetailsChange = createInputChangeHandler('vehicleDetails');
	const handleIssuanceChange = createInputChangeHandler('issuance');

	const handleStepBack = () => {
		navigate(-1);
	};

	const renderActiveForm = () => {
		switch (activeSection) {
			case 'customerDetails':
				return (
					<CustomerDetails
						details={customerDetails}
						onChange={handleCustomerDetailsChange}
						onNext={goToNextSection}
						onBack={goToPreviousSection}
					/>
				);
			case 'tyreDetails':
				return (
					<TyreDetails
						details={tyreDetails}
						onChange={handleTyreDetailsChange}
						onNext={goToNextSection}
						onBack={goToPreviousSection}
					/>
				);
			case 'vehicleDetails':
				return (
					<VehicleDetails
						details={vehicleDetails}
						onChange={handleVehicleDetailsChange}
						onNext={goToNextSection}
						onBack={goToPreviousSection}
					/>
				);
			case 'issuance':
				return (
					<Issuance
						details={issuance}
						onChange={handleIssuanceChange}
						onNext={goToNextSection}
						onBack={goToPreviousSection}
					/>
				);
			default:
				return <div>Select a section</div>;
		}
	};

	return (
		<>
			<button
				onClick={handleStepBack}
				className="flex items-center gap-2 text-slate-600 rounded-md cursor-pointer hover:text-slate-900"
			>
				<FaArrowLeft className="text-xs" />
				<h1 className="text-xl font-medium">Add Claims</h1>
			</button>
			<p className="text-xs text-slate-500 mb-2">
				Required fields are marked with *
			</p>
			<section className="flex gap-4 h-[92%]">
				<div className="flex-2 bg-white shadow-sm rounded-md pb-4 w-full overflow-clip">
					{renderActiveForm()}
				</div>
			</section>
		</>
	);
};

export default AddClaims;
