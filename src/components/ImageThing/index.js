import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

const ImageThing = ({url, description}) => (
	<div className="image-thing-container">
		{
			//<img className="image-thing-image" src={url} alt="Something"/>
		}
		<div className="image-thing-image" style={{backgroundImage: `url(${url})`}}></div>
		<div className="image-thing-description">{description}</div>
	</div>
)
ImageThing.propTypes = {
	data: PropTypes.object
};

export default ImageThing;