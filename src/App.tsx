import {Route, Routes, Navigate} from 'react-router';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './pages/auth/AuthLayout';
import {ROUTES} from './routing/routes';
import Claims from './pages/Claims';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import AppLayout from './pages/main/AppLayout';

const App = () => {
	const isAuthenticated = false; // Replace with actual authentication check

	return (
		<Routes>
			<Route
				path="/"
				element={
					isAuthenticated ? (
						<Navigate to={ROUTES.CLAIMS} />
					) : (
						<Navigate to={ROUTES.LOGIN} />
					)
				}
			/>
			<Route element={<AuthLayout />}>
				<Route path={ROUTES.LOGIN} element={<Login />} />
				<Route path={ROUTES.SIGNUP} element={<Register />} />
			</Route>
			<Route element={<AppLayout />}>
				<Route path={ROUTES.CLAIMS} element={<Claims />} />
				<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
				<Route path={ROUTES.CUSTOMERS} element={<Customers />} />
			</Route>
		</Routes>
	);
};

export default App;
