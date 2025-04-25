import {Outlet} from 'react-router';
import SideBar from '../../components/global/SideBar';
import Navbar from '../../components/global/Navbar';

const AppLayout = () => {
	return (
		<div className="flex h-screen">
			<SideBar />
			<section className="flex flex-col w-full">
				<Navbar />
				<div className="flex-1 p-4 bg-[#F5F6FA]">
					<Outlet />
				</div>
			</section>
		</div>
	);
};

export default AppLayout;
