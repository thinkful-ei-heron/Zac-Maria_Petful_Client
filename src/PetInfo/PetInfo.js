import React from 'react';

import './PetInfo.css'

export default class PetInfo extends React.Component {
	state = {
		imgURL: null,
		imgDesc: null,
		name: null,
		sex: null,
		age: null,
		breed: null,
		story: null
	}

	render() {
		return (
			<section className='petInfo'>
				<h3>{this.state.name}</h3>
				<img href={this.state.imgURL} alt={this.state.imgDesc} />
				<p>{this.state.sex} {this.state.breed}, age {this.state.age}</p>
				<p>{this.state.story}</p>
			</section>
		)
	}
}