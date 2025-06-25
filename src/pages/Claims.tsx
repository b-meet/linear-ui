import React, {useEffect, useState} from 'react';
import ResultTable from '../components/claims/ResultTable';
import PageHeader from '../components/pageHeader/PageHeader';
import ClaimFilterModal, {
	ClaimFilters,
} from '../components/claims/filtersModal';
import {useAppSelector, useAppDispatch} from '../hooks/redux';
import {VIEW_MODES} from '../utility/constant';
import GridViewContainer from '../components/claims/gridView/GridViewContainer';
import {fetchClaimsData} from '../redux/slices/claimsDataSlice';
import EditClaimWindow from '../components/claims/EditClaimWindow';

const Claims = () => {
	const dispatch = useAppDispatch();
	const {viewMode} = useAppSelector((state) => state.claimsFilter);
	const {claimsData, loading, error} = useAppSelector(
		(state) => state.claimsData
	);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [isClaimWindowOpen, setIsClaimWindowOpen] = useState(false);

	useEffect(() => {
		if (claimsData.length < 0 && !loading && !error) {
			dispatch(fetchClaimsData());
		}
	}, [dispatch, claimsData.length, loading, error]);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const applyFilters = (filters: ClaimFilters) => {
		console.log(filters, 'applyFilters');
	};

	return (
		<>
			<PageHeader
				heading="Search claims"
				subHeading="Search for claims by claim ID, Customer name, or other criteria."
				searchPlaceholder="Search by claim ID, name, docket, etc."
				onFilterClick={toggleModal}
				totalCount={claimsData.length}
			/>
			{viewMode === VIEW_MODES.LIST && (
				<ResultTable setIsClaimWindowOpen={setIsClaimWindowOpen} />
			)}
			{viewMode === VIEW_MODES.GRID && (
				<GridViewContainer setIsClaimWindowOpen={setIsClaimWindowOpen} />
			)}
			<ClaimFilterModal
				isOpen={isModalOpen}
				onClose={toggleModal}
				onApplyFilters={applyFilters}
			/>
			{/* claims form for editing */}
			{isClaimWindowOpen && (
				<EditClaimWindow setIsClaimWindowOpen={setIsClaimWindowOpen} />
			)}
		</>
	);
};

export default Claims;
