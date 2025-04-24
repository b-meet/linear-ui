import {Link} from 'react-router';
import {ROUTES} from '../../routing/routes';
import {FormEvent, useState} from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState({email: '', password: '', companyName: ''});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		companyName: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {value, name} = e.target;
		setUser({...user, [name]: value});
		setErrors((prevErrors) => ({...prevErrors, [name]: ''})); // Clear error on input
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let valid = true;
		const newErrors = {...errors};

		if (!user.companyName) {
			newErrors.companyName = 'Company Name is required';
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
			console.log(user, 'submit');
		}
	};

	return (
		<>
			<div className="shadow-sm py-4 px-8 rounded-md w-[400px] flex flex-col gap-4">
				<header>
					<h1 className="text-brand font-bold text-xl">LinearClaim</h1>
				</header>
				<p className="text-center text-lg">Create your account</p>
				<form className="flex flex-col gap-2 items-end" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-3 w-full">
						<label htmlFor="companyName" className="flex flex-col">
							<span className="text-sm">Company Name</span>
							<input
								id="companyName"
								type="text"
								name="companyName"
								className="custom-input"
								onChange={handleChange}
							/>
							{errors.companyName && (
								<p className="text-red-500 text-xs mt-1">
									{errors.companyName}
								</p>
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
