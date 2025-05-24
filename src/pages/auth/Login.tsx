import {FormEvent, useState} from 'react';
import {storageServices} from '../../utility/storageServices';
import {STORAGE_SERVICES} from '../../type';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import {Link, useNavigate} from 'react-router';
import {ROUTES} from '../../routing/routes';
import {API_ROUTES} from '../../utility/constant';
import {apiUnAuth} from '../../api/services';
import {toast} from 'react-toastify';
import {ILoginResponse} from '../../type';
import GlobalModal from '../../components/global/GlobalModal';

interface User {
	email: string;
	password: string;
}

interface Errors {
	email: string;
	password: string;
}

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [isResendDisabled, setIsResendDisabled] = useState(false);
	const [resendTimer, setResendTimer] = useState(60);
	const [user, setUser] = useState<User>({email: '', password: ''});
	const [errors, setErrors] = useState<Errors>({email: '', password: ''});
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {value, name} = e.target;
		setUser({...user, [name]: value});
		setErrors({...errors, [name]: ''});
	};

	const validateInputs = (): boolean => {
		let valid = true;
		const newErrors: Errors = {...errors};

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
		return valid;
	};

	const loginAPI = async (): Promise<void> => {
		try {
			const response = await apiUnAuth.post<User, ILoginResponse>(
				API_ROUTES.LOGIN,
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const isValid = validateInputs();
		if (isValid) {
			loginAPI();
		}
	};

	const handleForgotPass = async () => {
		if (user.email) {
			setShowModal(true);
			setIsLoading(true);
			setIsResendDisabled(true);
			setResendTimer(60);
			const timer = setInterval(() => {
				setResendTimer((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						setIsResendDisabled(false);
						return 60;
					}
					return prev - 1;
				});
			}, 1000);
			try {
				const response = await apiUnAuth.post<
					{email: string},
					{status: number; message: string}
				>(API_ROUTES.FORGOT_PASSWORD, {
					email: user.email,
				});
				if (response.status === 200) {
					toast(response.message);
				}
			} catch (error: unknown) {
				console.error(
					(error as {response: {data: {message: string}}}).response?.data
						?.message || 'Error sending OTP'
				);
				toast(
					(error as {response: {data: {message: string}}}).response?.data
						?.message || 'Error sending OTP'
				);
			} finally {
				setIsLoading(false);
			}
		} else {
			alert('Please enter your email first!');
		}
	};

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const handleOtpVerification = async () => {
		if (otp.length === 6 && newPassword) {
			try {
				const response = await apiUnAuth.post<
					{email: string; otp: string; newPassword?: string},
					{status: number; message: string}
				>(API_ROUTES.VERIFY_OTP, {
					email: user.email,
					otp,
					newPassword,
				});
				if (response.status === 200) {
					toast(response.message);
					setShowModal(false);
					setNewPassword('');
					setOtp('');
				}
			} catch (error: unknown) {
				console.error(
					(error as {response: {data: {message: string}}}).response?.data
						?.message || 'Error verifying OTP'
				);
				toast(
					(error as {response: {data: {message: string}}}).response?.data
						?.message || 'Error verifying OTP'
				);
			}
		} else {
			alert('Please enter a valid OTP and new password');
		}
	};

	return (
		<>
			<div className="shadow-sm py-4 px-8 rounded-md w-[400px] flex flex-col gap-4">
				<p className="text-center text-lg">Sign in to your account</p>
				<form className="flex flex-col gap-2 items-end" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-3 w-full">
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
						type="button"
						className="text-sm text-blue-700 cursor-pointer max-w-max hover:underline"
						onClick={handleForgotPass}
					>
						Forgot password?
					</button>
					<button
						type="submit"
						className="bg-brand text-sm py-1.5 rounded-md text-white w-full cursor-pointer"
					>
						Submit
					</button>
				</form>
				<span className="flex gap-4 items-center">
					<hr className="flex-1" /> or <hr className="flex-1" />
				</span>
				<p className="font-extralight text-center">Sign in with</p>
				<button className="text-sm border border-[#707070] rounded-md py-1">
					Google
				</button>
				<Link to={ROUTES.SIGNUP}>
					<p className="text-sm text-center bg-slate-200 py-2 rounded-md">
						Don't have an account? Sign up
					</p>
				</Link>
			</div>
			<GlobalModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				title="Enter OTP"
				isLoading={isLoading}
			>
				<div>
					<p className="text-sm mb-4 text-gray-600">
						We've sent an OTP to your email:
						<span className="font-medium text-brand ml-1">
							{user.email || 'your email'}
						</span>
					</p>
					<div className="flex flex-col items-end gap-3">
						<div className="flex flex-col gap-3 w-full">
							<input
								type="text"
								maxLength={6}
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								className="custom-input"
								placeholder="Enter OTP"
							/>
							<input
								type="password"
								value={newPassword}
								onChange={handleNewPasswordChange}
								className="custom-input"
								placeholder="Enter New Password"
							/>
						</div>
						<button
							className={`text-xs  ${isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
							onClick={handleForgotPass}
							disabled={isResendDisabled}
						>
							{isResendDisabled
								? `Resend OTP in ${resendTimer}s`
								: 'Resend OTP?'}
						</button>
					</div>
					<div className="flex justify-end gap-2 mt-4">
						<button
							className="cursor-pointer text-sm px-3 py-1 rounded-md border border-gray-400"
							onClick={() => setShowModal(false)}
						>
							Cancel
						</button>
						<button
							onClick={handleOtpVerification}
							className="cursor-pointer bg-brand text-white px-3 py-1 rounded-md text-sm"
						>
							{/* Add OTP verification logic here */}
							Verify
						</button>
					</div>
				</div>
			</GlobalModal>
		</>
	);
};

export default Login;
