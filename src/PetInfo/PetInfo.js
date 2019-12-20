import React from 'react';

import Loading from '../Loading/Loading';

import './PetInfo.css';

export default function PetInfo(props) {
	return (
		<section className='petInfo'>
			{props.loading && <Loading />}
			{!props.loading && <>
				{props.name &&
					<div>
						<h2>{props.name}</h2>
						<img className='imgPet' src={props.imgURL} alt={props.imgDesc} />
						<p className='p'>{props.sex} {props.breed}, age {props.age}</p>
						<p className='p'>{props.story}</p>
					</div>}
				{!props.name && <h3>No {props.animal}s in the shelter!</h3>}
			</>}

		</section>
	)
}