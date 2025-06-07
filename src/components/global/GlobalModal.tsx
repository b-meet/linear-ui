import React from 'react';
import {IoCloseSharp} from 'react-icons/io5';

interface GlobalModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	isLoading?: boolean;
	children: React.ReactNode;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
	isOpen,
	onClose,
	title,
	isLoading = false,
	children,
}) => {
	if (!isOpen) {
		return null;
	}
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-md relative">
				<div className="flex items-center justify-between mb-3">
					{title ? <h2 className="text-xl font-semibold">{title}</h2> : <div />}
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 text-2xl"
						aria-label="Close modal"
					>
						<IoCloseSharp />
					</button>
				</div>
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center bg-[#000000BB] z-50 rounded-lg">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
					</div>
				)}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default GlobalModal;
