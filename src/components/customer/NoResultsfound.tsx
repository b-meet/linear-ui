const NoResultsfound = () => {
	return (
		<div className="h-[calc(100%_-_135px)] grid place-items-center">
			<div className="p-8 text-center">
				<div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-semibold text-gray-800">
					No customers found
				</h3>
				<p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
			</div>
		</div>
	);
};

export default NoResultsfound;
