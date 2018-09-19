import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './Slider'
import ImageThing from './ImageThing'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BNRY?</h1>
		</header>
		<Slider data={images} thing={(props) => <ImageThing {...props}/>} />
      </div>
    );
  }
}

const images = [
	{
		url: 'https://picsum.photos/480/360/?image=472',
		description: '1'
	},
	{
		url: 'https://picsum.photos/480/360/?image=439',
		description: '2'
	},
	{
		url: 'https://picsum.photos/480/360/?image=22',
		description: '3'
	},
	{
		url: 'https://picsum.photos/480/360/?image=24',
		description: '4'
	},
	{
		url: 'https://picsum.photos/480/360/?image=20',
		description: '5'
	},
	{
		url: 'https://picsum.photos/480/360/?image=80',
		description: '6'
	}
]

export default App;
