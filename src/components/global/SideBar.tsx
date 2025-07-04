import {useState} from 'react';
import {FaPlus, FaRegUser} from 'react-icons/fa';
import {MdOutlineSpaceDashboard} from 'react-icons/md';
import {GoSidebarCollapse, GoSidebarExpand} from 'react-icons/go';
import {MdOutlineLibraryBooks} from 'react-icons/md';
import {useNavigate, useLocation} from 'react-router';
import {api} from '../../utility/apiClient';
import {Link} from 'react-router';
import {ROUTES} from '../../routing/routes';
import {toast} from 'react-toastify';
import {API_ROUTES} from '../../utility/constant';
import GlobalModal from './GlobalModal';
import {storageServices} from '../../utility/storageServices';
import {STORAGE_SERVICES} from '../../type';
import {useAppDispatch} from '../../hooks/redux';
import {userActions} from '../../redux/slices/userSlice/userSlice';
import {FaPowerOff} from 'react-icons/fa6';

const SideBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showUserDropdown, setShowUserDropdown] = useState(false);
	const [isOpen, setIsOpen] = useState(
		storageServices.get(STORAGE_SERVICES.LOCAL, 'siderbar') as boolean
	);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		storageServices.set(STORAGE_SERVICES.LOCAL, 'siderbar', !isOpen);
	};

	const addClaim = async () => {
		try {
			const response = await api.get<{data: string}>(API_ROUTES.ADD_CLAIMS);
			const newClaimId = response.data.toString();
			navigate(ROUTES.ADD_CLAIMS + '/' + newClaimId);
		} catch (error) {
			console.error('Error initiating new claim in SideBar:', error);
			toast.error('Failed to start a new claim. Please try again.');
		}
	};

	const handleLogout = () => {
		storageServices.terminate(STORAGE_SERVICES.LOCAL);
		dispatch(userActions.resetUser());
		navigate(ROUTES.LOGIN);
	};

	return (
		<>
			<div
				className={`h-full bg-white shadow-md pb-4 px-2 flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
			>
				<div className="flex items-center gap-4 h-20">
					<button
						onClick={toggleSidebar}
						className="text-gray-400 hover:text-gray-600 max-w-max cursor-pointer"
					>
						{isOpen ? (
							<GoSidebarExpand size={24} />
						) : (
							<GoSidebarCollapse size={24} />
						)}
					</button>
					{isOpen && (
						<div className="text-xl font-medium">
							<span className="text-brand font-bold">Linear</span>Claims
						</div>
					)}
				</div>

				<button
					onClick={addClaim}
					className="flex items-center gap-3 bg-brand hover:bg-brand-darker text-white text-sm px-4 py-3 rounded-md mb-4 cursor-pointer transition"
				>
					<FaPlus />
					{isOpen && <span className="whitespace-nowrap">New Claim</span>}
				</button>
				<div className="flex flex-col justify-between h-full">
					<nav className="flex flex-col gap-1 text-sm">
						<Link
							to={ROUTES.DASHBOARD}
							className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition ${
								location.pathname === ROUTES.DASHBOARD ? 'bg-gray-100' : ''
							}`}
						>
							<MdOutlineSpaceDashboard className="text-xl" />
							{isOpen && <span>Dashboard</span>}
						</Link>
						<Link
							to={ROUTES.CLAIMS}
							className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition ${
								location.pathname === ROUTES.CLAIMS ? 'bg-gray-100' : ''
							}`}
						>
							<MdOutlineLibraryBooks className="text-xl" />
							{isOpen && <span>Claims</span>}
						</Link>
						<Link
							to={ROUTES.CUSTOMERS}
							className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition ${
								location.pathname === ROUTES.CUSTOMERS ? 'bg-gray-100' : ''
							}`}
						>
							<FaRegUser className="text-xl" />
							{isOpen && <span>Customers</span>}
						</Link>
					</nav>
					<div className="relative">
						<button
							className={`inline-block p-2 rounded-md hover:bg-[#F9F9F9] ${showUserDropdown ? 'bg-[#F9F9F9]' : ''} cursor-pointer w-full text-left`}
							onClick={() => setShowUserDropdown(!showUserDropdown)}
						>
							<div className="flex gap-3 items-center">
								<span className="w-8 h-8 font-bold grid place-items-center rounded-full bg-brand-light-hover">
									U
								</span>
								{isOpen && <span>Username</span>}
							</div>
						</button>
						{showUserDropdown && (
							<div className="absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
								<button
									className="flex items-center gap-2 w-full bg-red-50 text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 cursor-pointer"
									onClick={() => {
										setShowLogoutModal(true);
										setShowUserDropdown(false);
									}}
								>
									<FaPowerOff /> Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			<GlobalModal
				isOpen={showLogoutModal}
				onClose={() => setShowLogoutModal(false)}
				title="Confirm Logout"
			>
				<p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
				<div className="flex justify-end gap-3">
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

export default SideBar;
