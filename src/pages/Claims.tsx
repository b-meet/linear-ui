import React, {useEffect} from 'react';
import ResultTable from '../components/claims/ResultTable';
import PageHeader from '../components/pageHeader/PageHeader';
import ClaimFilterModal, {
	ClaimFilters,
} from '../components/claims/filtersModal';
import {useAppSelector, useAppDispatch} from '../hooks/redux';
import {VIEW_MODES} from '../utility/constant';
import GridViewContainer from '../components/claims/gridView/GridViewContainer';
import {fetchClaimsData} from '../redux/slices/claimsDataSlice';

const Claims = () => {
	const dispatch = useAppDispatch();
	const {viewMode} = useAppSelector((state) => state.claimsFilter);
	const {claimsData, loading} = useAppSelector((state) => state.claimsData);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	useEffect(() => {
		if (claimsData.length === 0 && !loading) {
			dispatch(fetchClaimsData());
		}
	}, [dispatch, claimsData.length, loading]);

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
			{viewMode === VIEW_MODES.LIST && <ResultTable />}
			{viewMode === VIEW_MODES.GRID && <GridViewContainer />}
			<ClaimFilterModal
				isOpen={isModalOpen}
				onClose={toggleModal}
				onApplyFilters={applyFilters}
			/>
		</>
	);
};

export default Claims;
