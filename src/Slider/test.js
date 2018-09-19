import React from 'react'
import {shallow} from 'enzyme'
import Slider from './'

it('renders without crashing', () => {
	shallow(<Slider data={data}/>)
})

const data = [
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
