import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageThing from '../ImageThing'
import './Slider.css'

const delta = 100

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
			prevIndex,
			currIndex,
			nextIndex,
			bufferPos: [-delta, 0, delta]
		}
	}

	shiftBufferPos(direction){
		if (direction === 0) return
		let n = delta * direction
		let bufferPos = Array.from(this.state.bufferPos)
		for(let i=0; i < bufferPos.length; i++){
			let val = bufferPos[i] 
			if (val === 0 || val + n === 0)
				bufferPos[i] = val + n
				continue
			
			// moving left
			if (direction === -1){
				bufferPos[i] = delta
			} 
			// moving right
			else if (direction === 1){
				bufferPos[i] = -delta
			}
		}
	}

	shiftIndex(direction){
		// upgrade this to use absolute and modulus 
		if (direction === 0) return
		let {prevIndex, currIndex, nextIndex} = this.state
		let len = this.props.data.length
		
		// moving left
		if(direction === -1){
			nextIndex = currIndex
			currIndex = prevIndex
			prevIndex --
			if (prevIndex === -1)
				prevIndex =  len - 1
		} 
		// moving right
		else if (direction === 1){
			prevIndex = currIndex
			currIndex = nextIndex
			nextIndex ++
			if (nextIndex === len - 1)
				nextIndex = 0
		}
		this.setState({prevIndex, currIndex, nextIndex})
	}

	handlePrev(){
		if (this.props.data.length < 1) return
		this.shiftIndex(-1)
	}

	handleNext(){
		if (this.props.data.length < 1) return
		this.shiftIndex(1)
	}

	getTranslateX(x){
		return {
			transform: 'translateX(' + x + '%)'
		}
	}

	render(props) {
		const data = this.props.data
		const {currIndex, prevIndex, nextIndex, bufferPos} = this.state
		const prev = {
			style : this.getTranslateX(bufferPos[0]),
			data: data[prevIndex]
		}
		const curr = {
			style : this.getTranslateX(bufferPos[1]),
			data: data[currIndex]
		}
		const next = {
			style : this.getTranslateX(bufferPos[2]),
			data: data[nextIndex]
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