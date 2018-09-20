import React, { Component } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'
import Slider from './Slider'
import ImageThing from './ImageThing'


class App extends Component {
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
			<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Welcome to BNRY?</h1>
			</header>
			<Slider data={this.state.imageData} thing={ImageThing} />
			</div>
		)
	}
}

export default App;
