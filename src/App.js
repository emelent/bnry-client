import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './Slider'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BNRY?</h1>
		</header>
		<Slider data={images} />
      </div>
    );
  }
}

const images = [
	{
		url: 'https://picsum.photos/480/360/?image=472',
		description: 'I hope this is a boat'
	},
	{
		url: 'https://picsum.photos/480/360/?image=439',
		description: 'Are we looking at an animal?'
	},
	{
		url: 'https://picsum.photos/480/360/?image=22',
		description: 'Look at all these buttons'
	},
	{
		url: 'https://picsum.photos/480/360/?image=24',
		description: 'I could do with a lot more of these'
	},
	{
		url: 'https://picsum.photos/480/360/?image=20',
		description: 'Another great view'
	},
]

export default App;
