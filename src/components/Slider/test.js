import React from 'react'
import {shallow} from 'enzyme'
import Slider from './'


const FakeThing = ({num}) => (
	<div className="fake">{num}</div>
)

const prop = (wrapper, key) => wrapper.props().children.props[key]

it('displays the correct initial index', () => {
	const slider = shallow(<Slider data={data} itemType={FakeThing}/>)
	const currentNum = prop(slider.find('.thing-buffer-center'), 'num')
	expect(currentNum).toBe(data[0].num)
})

it('goes to the next and previous items when clicked', () =>{
	const slider = shallow(<Slider data={data} itemType={FakeThing}/>)
	const nextHalf = slider.find('.next-half').at(0)
	const prevHalf = slider.find('.prev-half').at(0)

	nextHalf.simulate('click')
	let currentNum = prop(slider.find('.thing-buffer-center'), 'num')
	expect(currentNum).toBe(data[1].num)


	prevHalf.simulate('click')
	currentNum = prop(slider.find('.thing-buffer-center'), 'num')
	expect(currentNum).toBe(data[0].num)
})


it('it wraps around when you click next passed the last image', () => {
	const slider = shallow(<Slider data={data} itemType={FakeThing}/>)
	const nextHalf = slider.find('.next-half').at(0)
	
	data.forEach(() => nextHalf.simulate('click'))
	let currentNum = prop(slider.find('.thing-buffer-center'), 'num')
	expect(currentNum).toBe(data[0].num)
})

it('it wraps around when you click prev passed the first image', () => {
	const slider = shallow(<Slider data={data} itemType={FakeThing}/>)
	const prevHalf = slider.find('.next-half').at(0)
	
	data.forEach(() => prevHalf.simulate('click'))
	let currentNum = prop(slider.find('.thing-buffer-center'), 'num')
	expect(currentNum).toBe(data[0].num)
})



const data = [
	{
		num: 1
	},
	{
		num: 2
	},
	{
		num: 3
	},
	{
		num: 4
	},
]
