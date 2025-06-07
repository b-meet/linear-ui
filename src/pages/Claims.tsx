import React from 'react';
import ResultTable from '../components/claims/ResultTable';
import PageHeader from '../components/pageHeader/PageHeader';
import ClaimFilterModal from '../components/claims/filtersModal';

const Claims = () => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const applyFilters = () => {
		console.log('applyFilters');
	};

	return (
		<>
			<PageHeader onFilterClick={toggleModal} />
			<ResultTable />
			<ClaimFilterModal
				isOpen={isModalOpen}
				onClose={toggleModal}
				onApplyFilters={applyFilters}
			/>
		</>
	);
};

export default Claims;
