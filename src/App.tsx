import {Route, Routes, Navigate} from 'react-router';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './pages/auth/AuthLayout';
import {ROUTES} from './routing/routes';
import Claims from './pages/Claims';
import ClaimsLayout from './pages/main/ClaimsLayout';

const App = () => {
	const isAuthenticated = false;

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
			<Route path={ROUTES.CLAIMS} element={<ClaimsLayout />}>
				<Route index element={<Claims />} />
			</Route>
		</Routes>
	);
};

export default App;
