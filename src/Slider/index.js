import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageThing from '../ImageThing'

class Slider extends Component {
	constructor(props) {
		super(props)
		this.handleNext = this.handleNext.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
		this.state = {
			index: 0,
			direction: 'next'
		}
	}

	handlePrev(){
		if (!this.hasNextAndPrev()) return
		let index = this.state.index - 1
		if (this.state.index === 0)
			index = this.props.data.length - 1

		this.setState({
			index,
			direction: 'prev'
		})
	}

	handleNext(){
		if (!this.hasNextAndPrev()) return
		let index = this.state.index + 1
		if (this.state.index >= this.props.data.length - 1){
			index = 0
		}

		this.setState({
			index,
			direction: 'next'
		})
	}

	getPrevIndex(){
		if (!this.hasNextAndPrev()) return 0
		
		const data = this.props.data
		const index = this.state.index
		if(index === 0)
			return data.length - 1

		return index - 1
	}

	getNextIndex(){
		if (!this.hasNextAndPrev()) return 0
		
		const data = this.props.data
		const index = this.state.index
		if(index >= data.length - 1)
			return 0

		return index + 1
	}

	hasNextAndPrev(){
		return this.props.data.length > 2
	}

	render(props) {
		const data = this.props.data
		const {index, direction} = this.state
		const newThingStyle = direction + 'ThingContainer'
		const currData = data[index]
		const nextData = data[this.getNextIndex()]
		const prevData = data[this.getPrevIndex()]

		return (
			<div style={styles.container}>
				<div style={styles.thingContainer}>
					<ImageThing data={currData} />
				</div>
				<div className={
						{...styles.thingContainer, ...styles[newThingStyle]}
					}
				>
					<ImageThing data={nextData} />
				</div>
				
				<div style={{...styles.control, ...styles.prevHalf}} 
					onClick={this.handlePrev}>
				</div>
				<div style={{...styles.control, ...styles.nextHalf}} 
					onClick={this.handleNext}>
				</div>
			</div>
		);
	}
}

// mobile styles
// the others will
const styles = {
	container: {
		position: 'relative',
		maxHeight: 300,
		overflow: 'hidden'
	},
	thingContainer: {
		position: 'relative',
		width: '100%'
	},
	nextThingContainer:{

	},
	prevThingContainer:{

	},
	control:{
		position: 'absolute',
		top: 0,
		height: '100%',
		width: '50%',
	},
	prevHalf:{
		left: 0,
		background: 'rgba(255, 0, 0, 0.3)'
	},
	nextHalf:{
		right: 0,
		background: 'rgba(0, 0, 255, 0.3)'
	}
}

Slider.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object)
};
	
export default Slider;	