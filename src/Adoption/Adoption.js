import React from 'react';
import config from '../config';

import PetInfo from '../PetInfo/PetInfo';

import './Adoption.css'

export default class Adoption extends React.Component {
	state = {
		cat: {
			imgURL: null,
			imgDesc: null,
			name: null,
			sex: null,
			age: null,
			breed: null,
			story: null
		},
		dog: {
			imgURL: null,
			imgDesc: null,
			name: null,
			sex: null,
			age: null,
			breed: null,
			story: null
		},

		userPlace: 0,

		loading: false,
		error: null
	}

	componentDidMount() {
		this.loadPet('cat');
		this.loadPet('dog');
	}

	loadPet(animal) {
		this.setState({ loading: true });
		fetch(config.REACT_APP_API_BASE + animal, {
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
				if (animal === 'cat') {
					this.setState({
						cat: {
							imgURL: item.imageURL,
							imgDesc: item.imageDescription,
							name: item.name,
							sex: item.sex,
							age: item.age,
							breed: item.breed,
							story: item.story
						}
					})
				}
				else this.setState({
					dog: {
						imgURL: item.imageURL,
						imgDesc: item.imageDescription,
						name: item.name,
						sex: item.sex,
						age: item.age,
						breed: item.breed,
						story: item.story
					}
				})
			})
			.catch(error => this.setState({ error }))
	}

	adopt(animal) {
		console.log(animal);
	}

	render() {
		return (
			<section className='adoption'>
				<div className='infoRow'>
					<PetInfo
						animal={'cat'}
						imgURL={this.state.cat.imgURL}
						imgDesc={this.state.cat.imgDesc}
						name={this.state.cat.name}
						sex={this.state.cat.sex}
						age={this.state.cat.age}
						breed={this.state.cat.breed}
						story={this.state.cat.story}
					/>
					<PetInfo
						animal={'dog'}
						imgURL={this.state.dog.imgURL}
						imgDesc={this.state.dog.imgDesc}
						name={this.state.dog.name}
						sex={this.state.dog.sex}
						age={this.state.dog.age}
						breed={this.state.dog.breed}
						story={this.state.dog.story}
					/>
				</div>
				{this.state.userPlace === 0 &&
					<div className='btnRow'>
						<button className='adoptCat' onClick={() => this.adopt('cat')}>Adopt Cat</button>
						<button className='adoptDog' onClick={() => this.adopt('dog')}>Adopt Dog</button>
					</div>}
				{this.state.userPlace !== 0 &&
					<div>
						<h4>Please wait your turn to adopt a pet.</h4>
						{this.state.userPlace === 1 && <p>There is 1 person ahead of you in line.</p>}
						{this.state.userPlace !== 1 && <p>There are {this.state.userPlace} people ahead of you in line.</p>}
					</div>}
			</section>

		)
	}
}