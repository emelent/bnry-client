import React from 'react';
import PropTypes from 'prop-types';


const ImageThing = ({url, description}) => (
	<div>
		<img src={url} alt="Something"/>
		<div>{description}</div>
	</div>
)
ImageThing.propTypes = {
	data: PropTypes.object
};

export default ImageThing;