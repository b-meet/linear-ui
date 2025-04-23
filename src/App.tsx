import {Route, Routes} from 'react-router';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './pages/auth/AuthLayout';

const App = () => {
	return (
		<Routes>
			<Route path="/" element="<div>App</div>" />
			<Route element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
};

export default App;
