import React from 'react';
import config from '../config';

import './PetInfo.css';

export default class PetInfo extends React.Component {
	state = {
		imgURL: null,
		imgDesc: null,
		name: null,
		sex: null,
		age: null,
		breed: null,
		story: null,

		error: null
	}

	componentDidMount() {
		this.setState({ loading: true });
		fetch(config.API_ENDPOINT + `${this.props.animal}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then(item => {
				this.setState({
					imgURL: item.imageURL,
					imgDesc: item.imageDescription,
					name: item.name,
					sex: item.sex,
					age: item.age,
					breed: item.breed,
					story: item.story
				})
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<section className='petInfo'>
				{this.state.name &&
					<div>
						<h3>{this.state.name}</h3>
						<img href={this.state.imgURL} alt={this.state.imgDesc} />
						<p>{this.state.sex} {this.state.breed}, age {this.state.age}</p>
						<p>{this.state.story}</p>
					</div>}
				{!this.state.name &&
					<h3>No {this.props.animal}s in the shelter!</h3>}
			</section>
		)
	}
}