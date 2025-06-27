export const getInitials = (name: string) => {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase();
};

export const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	};
	return new Date(dateString).toLocaleDateString(undefined, options);
};
