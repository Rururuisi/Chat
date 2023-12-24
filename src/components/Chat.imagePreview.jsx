function ImagePreview({ image, toggleFunc }) {
	return (
		<div id='img-preview' onClick={toggleFunc}>
			<img src={image} />
		</div>
	);
}

export default ImagePreview;
