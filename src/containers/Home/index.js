import React, { Component } from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

import './style.css'
import Slider from '../../components/Slider'
import ImageThing from '../../components/ImageThing'

const endpoint = 'http://localhost:5000'

class Home extends Component {
	state = {
		imageData: [],
		error:  null
	}

	componentDidMount(){
		const socket = socketIOClient(endpoint);
		socket.on('UPDATE', imageData => {
			this.setState({imageData})
		});
		axios.get(endpoint)
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
