import {Outlet} from 'react-router';
import SideBar from '../../components/global/SideBar';

const AppLayout = () => {
	return (
		<div className="flex h-screen">
			<SideBar />
			<section className="flex flex-col w-full">
				<div className="flex-1 p-4 bg-[#F9F9F9]">
					<Outlet />
				</div>
			</section>
		</div>
	);
};

export default AppLayout;
