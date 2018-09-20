import React, { Component } from 'react'
import axios from 'axios'
import './style.css'
import Slider from '../../components/Slider'
import ImageThing from '../../components/ImageThing'


class Home extends Component {
	constructor(props){
		super(props)

		this.state = {
			imageData: [],
			error: null
		}
	}
	componentDidMount(){
		console.log('requesting from the server')
		axios.get('http://localhost:5000/data')
			.then(({data}) => {
				this.setState({imageData: data})
			})
			.catch(error => this.setState({error}))
	}

	render() {
		return (
			<div>
				<Slider data={this.state.imageData} thing={ImageThing} />
			</div>
		)
	}
}

export default Home;
