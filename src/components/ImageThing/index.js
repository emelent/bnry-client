import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

const ImageThing = ({url, description}) => (
	<div className="image-thing-container">
		<div className="image-thing-image" style={{backgroundImage: `url(${url})`}}>
			<div className="image-thing-description">
				<span>{description}</span>
			</div>
		</div>
	</div>
)
ImageThing.propTypes = {
	data: PropTypes.object
};

export default ImageThing;