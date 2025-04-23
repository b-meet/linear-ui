import {Link} from 'react-router';
import {ROUTES} from '../../routing/routes';

const Login = () => {
	return (
		<div>
			<h1>Login Page</h1>
			<p>
				Don't have an account? <Link to={ROUTES.SIGNUP}>Sign up</Link>
			</p>
		</div>
	);
};

export default Login;
