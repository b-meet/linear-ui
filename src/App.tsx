import {Route, Routes, Navigate} from 'react-router';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './pages/auth/AuthLayout';
import {ROUTES} from './routing/routes';
import Claims from './pages/Claims';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import AppLayout from './pages/main/AppLayout';
import AddClaims from './pages/AddClaims';
import ProtectedRoute from './routing/ProtectedRoute';
import PublicRoute from './routing/PublicRoute';
import {storageServices} from './utility/storageServices';
import {STORAGE_SERVICES} from './type';

const App = () => {
	const authToken = storageServices.get(STORAGE_SERVICES.LOCAL, 'authToken');

	return (
		<Routes>
			<Route
				path="/"
				element={
					authToken ? (
						<Navigate to={ROUTES.DASHBOARD} replace />
					) : (
						<Navigate to={ROUTES.LOGIN} replace />
					)
				}
			/>

			<Route element={<PublicRoute />}>
				<Route element={<AuthLayout />}>
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route path={ROUTES.SIGNUP} element={<Register />} />
				</Route>
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route element={<AppLayout />}>
					<Route path={ROUTES.CLAIMS} element={<Claims />} />
					<Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTES.CUSTOMERS} element={<Customers />} />
					<Route path={`${ROUTES.ADD_CLAIMS}/:id`} element={<AddClaims />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
