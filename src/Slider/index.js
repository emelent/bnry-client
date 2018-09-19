import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageThing from '../ImageThing'
import './Slider.css'

const left = 'LEFT'
const center = 'CENTER'
const right = 'RIGHT'

const xtranslates= {
	[left]: -100,
	[center]: 0,
	[right]: 100
}


class Slider extends Component {
	constructor(props) {
		super(props)
		this.handleNext = this.handleNext.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
		
		const len = props.data.length
		const prevIndex = len - 1
		const currIndex = 0
		const nextIndex = Math.abs(1 % len)
		this.state = {
			buffer: [
				{pos: left, index:prevIndex}, 
				{pos:center, index:currIndex}, 
				{pos:right, index:nextIndex}
			]
		}
	}


	shiftbuffer(direction){
		if (direction === 0) return
		let buffer = Array.from(this.state.buffer)
		let len = this.props.data.length
		for(let i=0; i < buffer.length; i++){
			if (direction === 1){ // going right
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
			}else if (direction === -1){// going left
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
		}
		this.setState({buffer})
	}

	handlePrev(){
		if (this.props.data.length < 1) return
		this.shiftbuffer(-1)
	}

	handleNext(){
		if (this.props.data.length < 1) return
		this.shiftbuffer(1)
	}

	getBufferStyle(pos){
		return {
			transform: 'translateX(' + xtranslates[pos] + '%)',
			zIndex: (pos === center)? 1:0,
			opacity: (pos === center)? 1:0,
		}
	}



	render(props) {
		const data = this.props.data
		const {buffer} = this.state
		const prev = {
			style : this.getBufferStyle(buffer[0].pos),
			data: data[buffer[0].index]
		}
		const curr = {
			style : this.getBufferStyle(buffer[1].pos),
			data: data[buffer[1].index]
		}
		const next = {
			style : this.getBufferStyle(buffer[2].pos),
			data: data[buffer[2].index]
		}
		
		return (
			<div className="slider" >
				<div className="thing-buffer" style={prev.style}
				>
					<ImageThing data={prev.data} />
				</div>
				<div className="thing-buffer" style={curr.style}>
					<ImageThing data={curr.data} />
				</div>
				<div className="thing-buffer" style={next.style}>
					<ImageThing data={next.data} />
				</div>
				<div className="control-half prev-half" 
					onClick={this.handlePrev}
				></div>
				<div className="control-half next-half" 
					onClick={this.handleNext}
				></div>
			</div>
		);
	}
}

Slider.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object)
};
	
export default Slider;	

// <div className="control control-prev"
// onClick={this.handlePrev}
// >&lt;</div>
// <div className="control control-next"
// onClick={this.handleNext}
// >&gt;</div>