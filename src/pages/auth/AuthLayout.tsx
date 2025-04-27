import {Outlet} from 'react-router';

const AuthLayout = () => {
	return (
		<section>
			<div className="text-xl py-4 px-4">
				<span className="text-brand font-bold">Linear</span>Claims
			</div>
			<section className="grid place-items-center h-[calc(100vh-60px)]">
				<Outlet />
			</section>
		</section>
	);
};

export default AuthLayout;
