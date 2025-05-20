// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClaimStatusRenderer = (props: any) => {
	const status = props.value;

	return (
		<span
			className={`
        ${status === 'pending' && 'bg-yellow-500 text-white'} 
        ${status === 'accepted' && 'bg-emerald-500 text-white'} 
        ${status === 'rejected' && 'bg-red-500 text-white'} 
        py-1 px-4 rounded-full
      `}
		>
			{status}
		</span>
	);
};

export default ClaimStatusRenderer;
