import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function Login() {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, []);

	const signIn = (evt) => {
		navigate("/");
	};

	return (
		<div className='form-container'>
			<div className='form-wrapper'>
				<div className='logo'> Lama Chat </div>
				<div className='title'> Login </div>
				<form onSubmit={signIn}>
					<input type='email' placeholder='email' required />
					<input type='password' placeholder='password' required />
					<button type='submit'> Sign In </button>
				</form>
				<small>
					<span>Don't have an account?</span>{" "}
					<span
						className='auth-jump'
						onClick={() => navigate("/register")}>
						Register
					</span>
				</small>
			</div>
		</div>
	);
}

export default Login;
