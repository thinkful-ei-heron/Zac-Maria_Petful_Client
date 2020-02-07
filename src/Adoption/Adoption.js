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
		me: null,

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

	joinHandler = ev => {
		ev.preventDefault();
		const name = document.getElementById('name').value;

		fetch(config.REACT_APP_API_BASE + 'users', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ name })
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
			})
			.then(() => {
				this.setState({ me: name })
				this.loadUsers();
			})
			.catch(error => this.setState({ error }))
	}

	resetHandler = () => {
		fetch(config.REACT_APP_API_BASE + 'users', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ reset: true })
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status)
				}
			})
			.then(() => {
				this.setState({ me: null })
				this.loadUsers();
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
				{!this.state.loadUsers &&
					<>
						{this.state.users[0] === this.state.me
							? <div className='btnRow'>
								<button className='adoptCat' onClick={() => this.adopt('cat')}>Adopt Cat</button>
								<h3>It's your turn to adopt a pet!</h3>
								<button className='adoptDog' onClick={() => this.adopt('dog')}>Adopt Dog</button>
							</div>
							: <div>
								{this.state.me
									? <h4>Please wait your turn to adopt a pet.</h4>
									: <form onSubmit={ev => this.joinHandler(ev)}>
										<input
											type='text'
											id='name'
											required
										/>
										<input type='submit' value='Join Queue' />
									</form>
								}
							</div>
						}
						{!this.state.loadUsers && <p>Current adopters: {this.state.users.join(', ')}</p>}
					</>
				}
				{this.state.me && <button onClick={this.resetHandler}>Reset Queue</button>}
			</section>

		)
	}
}