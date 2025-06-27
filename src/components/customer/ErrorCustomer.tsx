const ErrorCustomer = ({error}: {error: string}) => {
	return (
		<div className="p-6 bg-red-50 border border-red-200 rounded-lg">
			<div className="flex items-center text-red-600 mb-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 mr-2"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
						clipRule="evenodd"
					/>
				</svg>
				<p className="font-medium">Error</p>
			</div>
			<p>{error}</p>
			<button
				className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
				onClick={() => window.location.reload()}
			>
				Try Again
			</button>
		</div>
	);
};

export default ErrorCustomer;
