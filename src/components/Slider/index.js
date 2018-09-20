import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css'


const left = 'left'
const center = 'center'
const right = 'right'

class Slider extends Component {
	constructor(props) {
		super(props)
		this.handleNext = this.handleNext.bind(this)
		this.handlePrev = this.handlePrev.bind(this)

		this.state = {
			buffer: [
				{pos:left, index: 0}, 
				{pos:center, index:0}, 
				{pos:right, index: 0}
			]
		}
	}

	componentWillReceiveProps(nextProps){
		const len = nextProps.data.length
		const prevIndex = len - 1
		const nextIndex = Math.abs(1 % len)
		let buffer = this.state.buffer
		buffer[0].index = prevIndex
		buffer[2].index = nextIndex

		this.setState({buffer})
	}
	
	// refactor me
	slide(direction){
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
		this.slide(-1)
	}

	handleNext(){
		if (this.props.data.length < 1) return
		this.slide(1)
	}

	getBufferClassName(pos){
		return 'thing-buffer-' + pos
	}



	render() {
		const {data} = this.props
		const Thing = this.props.thing
		const {buffer} = this.state

		const prev = {
			className : this.getBufferClassName(buffer[0].pos),
			data: data[buffer[0].index]
		}
		const curr = {
			className : this.getBufferClassName(buffer[1].pos),
			data: data[buffer[1].index]
		}
		const next = {
			className : this.getBufferClassName(buffer[2].pos),
			data: data[buffer[2].index]
		}
		
		console.log(next)
		console.log(prev)
		const NextHint = (next.data)? next.data.description:"Next"
		const PrevHint = (prev.data)? prev.data.description:"Prev"
		
		return (
			<div className="slider" >
				<div className={'thing-buffer ' + prev.className}
				>
					<Thing {...prev.data} />
				</div>
				<div className={'thing-buffer ' + curr.className}>
					<Thing {...curr.data} />
				</div>
				<div className={'thing-buffer ' + next.className}>
					<Thing {...next.data} />
				</div>
				<div className="control-half prev-half" 
					onClick={this.handlePrev}
				></div>
				<div className="control-half next-half" 
					onClick={this.handleNext}
				></div>

				<div className="control-container">
					<div className="control control-prev"
						onClick={this.handlePrev}
						title={PrevHint}
					>&lt;</div>
					<div className="control control-spacer"></div>
					<div className="control control-next"
						onClick={this.handleNext}
						title={NextHint}
					>&gt;</div>
				</div>
				
			</div>
		);
	}
}

Slider.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
	
export default Slider;	

