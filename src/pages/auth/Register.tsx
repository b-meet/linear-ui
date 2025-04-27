import {Link, useNavigate} from 'react-router';
import {ROUTES} from '../../routing/routes';
import {FormEvent, useState} from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {apiUnAuth} from '../../api/services';
import {API_ROUTES} from '../../utility/constant';
import {toast} from 'react-toastify';
import {IRegisterResponse, STORAGE_SERVICES} from '../../type';
import {storageServices} from '../../utility/storageServices';

const Register = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState({email: '', password: '', name: ''});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		name: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {value, name} = e.target;
		setUser({...user, [name]: value});
		setErrors((prevErrors) => ({...prevErrors, [name]: ''})); // Clear error on input
	};

	const registerAPI = async (): Promise<void> => {
		try {
			const response = await apiUnAuth.post<unknown, IRegisterResponse>(
				API_ROUTES.REGISTER,
				user
			);
			if (response.status === 200) {
				navigate(ROUTES.DASHBOARD);
			}
			if (response.data.token) {
				storageServices.set(
					STORAGE_SERVICES.LOCAL,
					'authToken',
					response.data.token
				);
			}
			toast(response.message);
		} catch (error: unknown) {
			console.error(
				(error as {response: {data: {message: string}}}).response?.data
					?.message || 'Login failed'
			);
			toast(
				(error as {response: {data: {message: string}}}).response?.data
					?.message || 'Login failed'
			);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let valid = true;
		const newErrors = {...errors};

		if (!user.name) {
			newErrors.name = 'Company Name is required';
			valid = false;
		}

		if (!user.email) {
			newErrors.email = 'Email is required';
			valid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
			newErrors.email = 'Invalid email format';
			valid = false;
		}

		if (!user.password) {
			newErrors.password = 'Password is required';
			valid = false;
		}

		setErrors(newErrors);

		if (valid) {
			registerAPI();
		}
	};

	return (
		<>
			<div className="shadow-sm py-4 px-8 rounded-md w-[400px] flex flex-col gap-4">
				<p className="text-center text-lg">Create your account</p>
				<form className="flex flex-col gap-2 items-end" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-3 w-full">
						<label htmlFor="name" className="flex flex-col">
							<span className="text-sm">Company Name</span>
							<input
								id="name"
								type="text"
								name="name"
								className="custom-input"
								onChange={handleChange}
							/>
							{errors.name && (
								<p className="text-red-500 text-xs mt-1">{errors.name}</p>
							)}
						</label>
						<label htmlFor="email" className="flex flex-col">
							<span className="text-sm">Email</span>
							<input
								id="email"
								type="email"
								name="email"
								className="custom-input"
								onChange={handleChange}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs mt-1">{errors.email}</p>
							)}
						</label>
						<label htmlFor="password" className="flex flex-col relative">
							<span className="text-sm">Password</span>
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								className="custom-input pr-10"
								onChange={handleChange}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs mt-1">{errors.password}</p>
							)}
							<span
								className="absolute right-3 top-[30px] cursor-pointer text-gray-500"
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? <FiEyeOff /> : <FiEye />}
							</span>
						</label>
					</div>
					<button
						type="submit"
						className="bg-brand text-sm py-1.5 mt-2 rounded-md text-white w-full cursor-pointer"
					>
						Submit
					</button>
				</form>
				<span className="flex gap-4 items-center">
					<hr className="flex-1" /> or <hr className="flex-1" />
				</span>
				<p className="font-extralight text-center">Sign up with</p>
				<button className="text-sm border border-[#707070] rounded-md py-1">
					Google
				</button>
				<Link to={ROUTES.LOGIN}>
					<p className="text-sm text-center bg-slate-200 py-2 rounded-md">
						Already have an account? Login
					</p>
				</Link>
			</div>
		</>
	);
};

export default Register;
