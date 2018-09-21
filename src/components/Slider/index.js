import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'

// positional constants
const left = 'left'
const center = 'center'
const right = 'right'

class Slider extends Component {
	constructor(props) {
		super(props)
		const len = props.data.length
		const prevIndex = len - 1
		const nextIndex = Math.abs(1 % len)
		this.state = {
			buffer: [
				{pos:left, index: prevIndex}, 
				{pos:center, index:0}, 
				{pos:right, index: nextIndex}
			]
		}
	}

	componentWillReceiveProps(nextProps){
		// update indices on props update
		const len = nextProps.data.length
		const prevIndex = len - 1
		const nextIndex = Math.abs(1 % len)
		let buffer = this.state.buffer
		buffer[0].index = prevIndex
		buffer[2].index = nextIndex

		this.setState({buffer})
	}
	
	handleNext = () => {
		// do nothing if there are no  images
		let len = this.props.data.length
		if (len < 1) return

		// update positions and indexes of buffers
		let buffer = Array.from(this.state.buffer)
		for(let i=0; i < buffer.length; i++){
			switch(buffer[i].pos){
				case left:
					buffer[i].pos = right
					buffer[i].index = (buffer[(i + 2) % 3].index + 1) % len
					break
				case right:
					buffer[i].pos = center
					break
				case center:
					buffer[i].pos = left
					break
				default: break
			}
		}	
		this.setState({buffer})	
	}

	// handle prev click
	handlePrev = () => {
		// do nothing if there are no  images
		let len = this.props.data.length
		if (len < 1) return
		
		// update positions and indexes of buffers
		let buffer = Array.from(this.state.buffer)
		for(let i=0; i < buffer.length; i++){
			switch(buffer[i].pos){
				case left:
					buffer[i].pos = center
					break
				case right:
					buffer[i].pos = left
					buffer[i].index = (buffer[(i + 1) % 3].index - 1)
					if (buffer[i].index ===  -1)
						buffer[i].index = len -1
					break
				case center:
					buffer[i].pos = right
					break
				default: break
			}				
		}
		this.setState({buffer})
	}

	// return buffer class names
	getBufferClassNames(pos){
		let cn = `thing-buffer-${pos}`
		if(pos === center)
			cn += ' active'
		return cn
	}

	render() {
		const {data, width, height, transitionDuration, itemType} = this.props
		const Thing = itemType
		const {buffer} = this.state

		// setup buffer data
		const b1 = {
			className : this.getBufferClassNames(buffer[0].pos),
			data: data[buffer[0].index]
		}
		const b2 = {
			className : this.getBufferClassNames(buffer[1].pos),
			data: data[buffer[1].index]
		}
		const b3 = {
			className : this.getBufferClassNames(buffer[2].pos),
			data: data[buffer[2].index]
		}

		// setup hint text
		const currIndex = buffer.find(b => b.pos === center).index
		let prevIndex = currIndex - 1
		let nextIndex = (currIndex + 1) % data.length
		if (prevIndex < 0) prevIndex = data.length - 1


		const PrevHint = (data.length > 0)? data[prevIndex].description: "Prev"
		const NextHint = (data.length > 0)? data[nextIndex].description : "Next"

		const style = {
			width,
			height,
			transitionDuration
		}
		return (
			<div className="slider" style={style} >
				{/* Buffers */}
				<div className={'thing-buffer ' + b1.className}>
					<Thing {...b1.data} transitionDuration={transitionDuration}/>
				</div>
				<div className={'thing-buffer ' + b2.className}>
					<Thing {...b2.data} transitionDuration={transitionDuration} />
				</div>
				<div className={'thing-buffer ' + b3.className}>
					<Thing {...b3.data} transitionDuration={transitionDuration} />
				</div>
				
				{/* Clickable left and right halfs*/}
				<div className="control-half prev-half" 
					onClick={this.handlePrev}
				></div>
				<div className="control-half next-half" 
					onClick={this.handleNext}
				></div>

				{/* Prev and Next buttons*/}
				<div className="control-container">
					<div className="control control-prev"
						onClick={this.handlePrev}
						title={PrevHint}
					>
						<i className="mdi mdi-arrow-left mdi-18px"></i>
					</div>
					<div className="control control-spacer"></div>
					<div className="control control-next"
						onClick={this.handleNext}
						title={NextHint}
					>
						<i className="mdi mdi-arrow-right mdi-18px">
					</i></div>
				</div>
			</div>
		);
	}
}

Slider.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	width: PropTypes.string,
	height: PropTypes.string,
	transitionDuration: PropTypes.string,
	itemType: PropTypes.func.isRequired
};

Slider.defaultProps = {
	width: '100%',
	height: '540px',
	transitionDuration: '0.6s'
}
	
export default Slider;	

