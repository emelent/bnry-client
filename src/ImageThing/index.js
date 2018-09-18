import React from 'react';
import PropTypes from 'prop-types';


const ImageThing = ({data:{url, description}}) => (
	<div>
		<img src={url} alt="Something"/>
		<div>{description}</div>
	</div>
)
Image.propTypes = {
	data: PropTypes.object
};

export default ImageThing;