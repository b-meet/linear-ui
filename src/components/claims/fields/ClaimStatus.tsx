// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClaimStatusRenderer = (props: any) => {
	const status = props.value;

	return (
		<span
			className={`
        ${status === 'pending' && 'bg-yellow-200 text-yellow-800'} 
        ${status === 'accepted' && 'bg-emerald-200 text-emerald-800'} 
        font-bold py-1 px-4 rounded-full
      `}
		>
			{status}
		</span>
	);
};

export default ClaimStatusRenderer;
