import React from 'react';

import './PetInfo.css';

export default function PetInfo(props) {
	return (
		<section className='petInfo'>
			{props.name &&
				<div>
					<h3>{props.name}</h3>
					<img href={this.state.imgURL} alt={props.imgDesc} />
					<p>{props.sex} {props.breed}, age {props.age}</p>
					<p>{props.story}</p>
				</div>}
			{!props.name && <h3>No {props.animal}s in the shelter!</h3>}
		</section>
	)
}