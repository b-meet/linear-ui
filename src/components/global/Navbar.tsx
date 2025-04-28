import {useState} from 'react';
import GlobalModal from './GlobalModal';
import {storageServices} from '../../utility/storageServices';
import {STORAGE_SERVICES} from '../../type';
import {useAppDispatch} from '../../hooks/redux';
import {userActions} from '../../redux/slices/userSlice/userSlice';
import {useNavigate} from 'react-router';
import {ROUTES} from '../../routing/routes';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const handleLogout = () => {
		storageServices.terminate(STORAGE_SERVICES.LOCAL);
		dispatch(userActions.resetUser());
		navigate(ROUTES.LOGIN);
	};

	return (
		<>
			<nav className="h-16 flex items-center justify-between px-3 bg-white">
				<div className="text-xl font-medium">
					<span className="text-brand font-bold">Linear</span>Claims
				</div>
				<button
					className="inline-block w-10 h-10 rounded-full bg-red-100 cursor-pointer"
					onClick={() => setShowLogoutModal(true)}
				>
					d
				</button>
			</nav>

			<GlobalModal
				isOpen={showLogoutModal}
				onClose={() => setShowLogoutModal(false)}
				title="Confirm Logout"
			>
				<p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
				<div className="flex justify-start gap-4">
					<button
						className="px-4.5 py-1.5 cursor-pointer rounded-md border border-gray-400 text-sm hover:bg-gray-200"
						onClick={() => setShowLogoutModal(false)}
					>
						Cancel
					</button>
					<button
						className="px-4.5 py-1.5 cursor-pointer rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
						onClick={() => {
							handleLogout();
							setShowLogoutModal(false);
						}}
					>
						Logout
					</button>
				</div>
			</GlobalModal>
		</>
	);
};

export default Navbar;
