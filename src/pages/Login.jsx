import { Link } from "react-router-dom";
import { signInUser } from "../firebase/firebase.auth";

function Login() {
	const signIn = async (evt) => {
		evt.preventDefault();
		const email = evt.target[0].value;
		const password = evt.target[1].value;

		try {
			await signInUser(email, password);
		} catch (err) {
			alert(err.message);
			evt.target[1].focus();
		}
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
					<Link className='auth-jump' to='/register'>
						Register
					</Link>
				</small>
			</div>
		</div>
	);
}

export default Login;
