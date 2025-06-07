import React from 'react';
import ResultTable from '../components/claims/ResultTable';
import PageHeader from '../components/pageHeader/PageHeader';
import ClaimFilterModal, {
	ClaimFilters,
} from '../components/claims/filtersModal';
import {useAppSelector} from '../hooks/redux';
import {VIEW_MODES} from '../utility/constant';
import GridViewContainer from '../components/claims/gridView/GridViewContainer';

const Claims = () => {
	const {viewMode} = useAppSelector((state) => state.claimsFilter);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const applyFilters = (filters: ClaimFilters) => {
		console.log(filters, 'applyFilters');
	};

	return (
		<>
			<PageHeader onFilterClick={toggleModal} />
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
