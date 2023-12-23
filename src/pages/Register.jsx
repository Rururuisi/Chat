import { Link } from "react-router-dom";
import { createUser } from "../firebase/firebase.auth";
import AddAvatar from "../img/addAvatar.png";

function Register() {
	const submitHandler = async (evt) => {
		evt.preventDefault();
		const displayName = evt.target[0].value;
		const email = evt.target[1].value;
		const password = evt.target[2].value;
		const avatar = evt.target[3].files[0];

		try {
			await createUser(displayName, email, password, avatar);
		} catch (err) {
			alert(err.message);
			evt.target[2].value = "";
			evt.target[2].focus();
		}
	};

	return (
		<div className='form-container'>
			<div className='form-wrapper'>
				<div className='logo'> Lama Chat </div>
				<div className='title'> Register </div>
				<form onSubmit={submitHandler}>
					<input
						type='text'
						placeholder='display name'
						required
						autoFocus
					/>
					<input type='email' placeholder='email' required />
					<input type='password' placeholder='password' required />
					<input type='file' id='file' />
					<label htmlFor='file' className='avatar-btn'>
						<img src={AddAvatar} />
						<span>Add an avatar</span>
					</label>
					<button type='submit'> Sign Up </button>
				</form>
				<small>
					<span>Already have an account?</span>{" "}
					<Link className='auth-jump' to='/login'>
						Login
					</Link>
				</small>
			</div>
		</div>
	);
}

export default Register;
