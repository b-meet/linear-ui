import {Outlet} from 'react-router';

const AuthLayout = () => {
	return (
		<section className="grid place-items-center h-screen">
			<Outlet />
		</section>
	);
};

export default AuthLayout;
