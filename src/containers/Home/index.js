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
		// connect to socket io client
		const socket = socketIOClient(endpoint);

		// update image data on 'UPDATE' message from socketio server
		socket.on('UPDATE', imageData => {
			this.setState({imageData})
		});

		// get image data from the server
		axios.get(endpoint)
			.then(({data}) => {
				this.setState({imageData: data})
			})
			.catch(error => this.setState({error}))
		
	}

	render() {
		return (
			<div className="home-view">
				<div className="home-title">BNRY ReactJS Slider</div>
				{ (this.state.error)?
					<div className="home-warning">Failed to connect to Server... Using dummy daata</div>
					:
					<Slider data={this.state.imageData} thing={ImageThing} />
				}
			</div>
		)
	}
}

export default Home;
