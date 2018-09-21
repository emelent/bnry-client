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
		const {imageData, error} = this.state
		const data = (error)? dummyData:imageData
		return (
			<div className="home-view">
				<div className="home-title">BNRY ReactJS Slider</div>
				{ (this.state.error) &&
					<div className="home-warning">Failed to connect to Server... Using dummy daata</div>
				}
				<Slider width="480px" data={data} itemType={ImageThing} />
				
			</div>
		)
	}
}

const dummyData = [
	{
		_id:1, 
		url: 'https://picsum.photos/860/640/?image=10',
		description: 'This is an interesting item'
	},
	{
		_id:2, 
		url: 'https://picsum.photos/860/640/?image=20',
		description: 'This might just be a button'
	},
	{
		_id:3, 
		url: 'https://picsum.photos/860/640/?image=30',
		description: 'I hope this one is a boat'
	},
	{
		_id:4, 
		url: 'https://picsum.photos/860/640/?image=40',
		description: 'Not quite sure what this is'
	},
	{
		_id:5, 
		url: 'https://picsum.photos/860/640/?image=50',
		description: 'You probably expected a peach'
	},
	{
		_id:6, 
		url: 'https://picsum.photos/860/640/?image=60',
		description: 'It only gets better from here'
	},
	{
		_id:7, 
		url: 'https://picsum.photos/860/640/?image=70',
		description: 'The only way down is up?'
	},
	{
		_id:8, 
		url: 'https://picsum.photos/860/640/?image=80',
		description: 'Part of an old military experiment'
	},
	{
		_id:9, 
		url: 'https://picsum.photos/860/640/?image=90',
		description: 'It was okay when I left it'
	},
	{
		_id:10,
		url:  'https://picsum.photos/860/640/?image=100',
		description: 'One for all I suppose...'
	}
]
export default Home;
