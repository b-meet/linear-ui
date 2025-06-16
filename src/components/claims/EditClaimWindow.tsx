import {CgClose} from 'react-icons/cg';
import AddClaims from '../../pages/AddClaims';
import {EditClaimWindowProps} from './types';

const EditClaimWindow = ({setIsClaimWindowOpen}: EditClaimWindowProps) => {
	return (
		<section className="absolute top-0 bottom-0 right-0 w-full z-50 drop-shadow-lg flex justify-end bg-black/50">
			<div className="w-[575px] bg-white">
				<div className="p-4">
					<h2 className="text-xl font-semibold mb-4">Edit Claim</h2>
					<AddClaims showHeader={false} />
					<button
						onClick={() => setIsClaimWindowOpen(false)}
						className="absolute top-4 right-[585px] bg-white hover:bg-brand text-black hover:text-white p-1.5 rounded cursor-pointer"
					>
						<CgClose />
					</button>
				</div>
			</div>
		</section>
	);
};

export default EditClaimWindow;
