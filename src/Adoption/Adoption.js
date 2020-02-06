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

		users: null,
		loadUsers: true,
		loadCat: false,
		loadDog: false,
		error: null
	}

	timer = null;

	componentDidMount() {
		this.loadUsers();
		this.loadPet('cat');
		this.loadPet('dog');
		this.timer = setInterval(this.cycleUsers, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	cycleUsers = () => {
		fetch(config.REACT_APP_API_BASE + 'users', {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
			})
			.then(() => this.loadUsers())
			.catch(error => this.setState({ error }))
	}

	loadUsers = () => {
		console.log('getting users....')
		fetch(config.REACT_APP_API_BASE + 'users', {
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
			.then(list => {
				console.log(list);
				this.setState({ users: list });
				this.setState({ loadUsers: false });
			})
			.catch(error => this.setState({ error }))
	}

	loadPet = animal => {
		if (animal === 'cat') this.setState({ loadCat: true });
		else this.setState({ loadDog: true });

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
				console.log(item);
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
				if (animal === 'cat') this.setState({ loadCat: false });
				else this.setState({ loadDog: false });
			})
			.catch(error => this.setState({ error }))
	}

	adopt = animal => {
		fetch(config.REACT_APP_API_BASE + animal, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
			})
			.then(() => {
				this.loadPet(animal);
				this.cycleUsers();
			})
			.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<section className='adoption'>
				<div className='infoRow'>
					<PetInfo
						loading={this.state.loadCat}
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
						loading={this.state.loadDog}
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
				{this.state.users === 'Reese Fletcher' &&
					<div className='btnRow'>
						<button className='adoptCat' onClick={() => this.adopt('cat')}>Adopt Cat</button>
						<h3>It's your turn to adopt a pet!</h3>
						<button className='adoptDog' onClick={() => this.adopt('dog')}>Adopt Dog</button>
					</div>}
				{this.state.users !== 'Reese Fletcher' &&
					<div>
						<h4>Please wait your turn to adopt a pet.</h4>
						{!this.state.loadUsers && <p>Current adopters: {this.state.users.join(', ')}</p>}
					</div>}
			</section>

		)
	}
}