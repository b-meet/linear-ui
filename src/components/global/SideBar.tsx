import {useState, useEffect} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../utility/environment';
import {FaPlus, FaRegUser} from 'react-icons/fa';
import {MdOutlineSpaceDashboard} from 'react-icons/md';
import {GoSidebarCollapse, GoSidebarExpand} from 'react-icons/go';
import {MdOutlineLibraryBooks} from 'react-icons/md';
import {useNavigate, useLocation} from 'react-router';

import {Link} from 'react-router';
import {ROUTES} from '../../routing/routes';

const SideBar = () => {
	const [isOpen, setIsOpen] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const [addClaimId, setAddClaimId] = useState<string | null>(null);

	useEffect(() => {
		if (addClaimId) {
			navigate(`/add-claim/${addClaimId}`);
		}
	}, [addClaimId, navigate]);

	const toggleSidebar = () => setIsOpen(!isOpen);

	const addClaim = async () => {
		if (!location.pathname.includes(ROUTES.ADD_CLAIMS)) {
			try {
				const response = await axios.get(`${API_BASE_URL}/api/claims/addClaim`);
				const data = response.data;
				setAddClaimId(data.id.toString());
			} catch (error) {
				console.error('Error fetching claim ID:', error);
			}
		}
	};

	return (
		<div
			className={`h-full bg-white shadow-md py-4 px-2 flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
		>
			<button
				onClick={toggleSidebar}
				className="text-gray-400 hover:text-gray-600 mb-6"
			>
				{isOpen ? (
					<GoSidebarExpand size={24} />
				) : (
					<GoSidebarCollapse size={24} />
				)}
			</button>

			<button
				onClick={addClaim}
				className="flex items-center gap-3 bg-brand hover:bg-brand-darker text-white text-sm px-4 py-3 rounded-md mb-4 transition"
			>
				<FaPlus />
				{isOpen && <span className="whitespace-nowrap">New Claim</span>}
			</button>

			{/* Nav Links */}
			<nav className="flex flex-col gap-1 text-sm">
				<Link
					to={'/dashboard'}
					className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition"
				>
					<MdOutlineSpaceDashboard className="text-xl" />
					{isOpen && <span>Dashboard</span>}
				</Link>
				<Link
					to={ROUTES.CLAIMS}
					className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition"
				>
					<MdOutlineLibraryBooks className="text-xl" />
					{isOpen && <span>Claims</span>}
				</Link>
				<Link
					to={'/customers'}
					className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition"
				>
					<FaRegUser className="text-xl" />
					{isOpen && <span>Customers</span>}
				</Link>
			</nav>
		</div>
	);
};

export default SideBar;
