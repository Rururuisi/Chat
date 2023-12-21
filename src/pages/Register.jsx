import AddAvatar from "../img/addAvatar.png";

function Register() {
	return (
		<div className='form-container'>
			<div className='form-wrapper'>
				<div className='logo'> Lama Chat </div>
				<div className='title'> Register </div>
				<form>
					<input type='text' placeholder='display name' required />
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
					<span className='auth-jump'>Login</span>
				</small>
			</div>
		</div>
	);
}

export default Register;
