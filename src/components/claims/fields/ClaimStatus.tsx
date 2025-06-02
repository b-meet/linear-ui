// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClaimStatusRenderer = (props: any) => {
	const status = props.value;

	return (
		<span
			className={`
        ${status === 'pending' && 'bg-[#F4E87C] text-slate-700'} 
        ${status === 'accepted' && 'bg-[#6FD392] text-slate-700'} 
        ${status === 'rejected' && 'bg-[#F4A1A1] text-slate-700'} 
        py-1 px-4 rounded-full
      `}
		>
			{status}
		</span>
	);
};

export default ClaimStatusRenderer;
