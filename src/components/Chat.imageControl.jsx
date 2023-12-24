function ImageControl({ image = "", cancelHandler }) {
	return (
		<div id='image-control'>
			<img src={image} />
			<div>
				<button
					type='button'
					className='cancel-btn'
					onClick={cancelHandler}>
					Cancel
				</button>
				<button type='submit' className='send-btn'>
					Send
				</button>
			</div>
		</div>
	);
}

export default ImageControl;
