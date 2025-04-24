import {Route, Routes} from 'react-router';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './pages/auth/AuthLayout';
import {ROUTES} from './routing/routes';

const App = () => {
	return (
		<Routes>
			<Route path="/" element="<div>App</div>" />
			<Route element={<AuthLayout />}>
				<Route path={ROUTES.LOGIN} element={<Login />} />
				<Route path={ROUTES.SIGNUP} element={<Register />} />
			</Route>
		</Routes>
	);
};

export default App;
