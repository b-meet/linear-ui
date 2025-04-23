import {Outlet} from 'react-router';

const AuthLayout = () => {
	return (
		<div style={{padding: '2rem', border: '1px solid #ccc'}}>
			<h2>Auth Layout</h2>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
