const LoadingCustomer = () => {
	return (
		<div className="flex items-center justify-center min-h-[300px]">
			<div className="flex flex-col items-center">
				<div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
				<p className="mt-4 text-gray-600">Loading customers...</p>
			</div>
		</div>
	);
};

export default LoadingCustomer;
