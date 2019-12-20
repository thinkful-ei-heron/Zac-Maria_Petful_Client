import React from 'react';

import { Link } from 'react-router-dom';

import './LandingPage.css';

export default function LandingPage() {
	return(
		<section className='frontPage'>
			<img src='https://cdn.pixabay.com/photo/2017/04/11/15/55/animals-2222007_1280.jpg' alt='Collage of various cats and dogs looking cute' />
			<p>The FIFO Pet Adoption Agency is an animal shelter which allows adoption of cats and dogs. These are the only two animals allowed in the shelter. The adoption process works strictly on a "First-In, First-Out" policy based on the animals that came to the shelter first. People can adopt a cat, or a dog, or both, but they may only adopt the animal that came to the shelter first. In addition, people who want to adopt are also put in a queue so they can adopt when it's their turn.</p>
			<h3><Link to={'/adoption'}>Adopt now -></Link></h3>
		</section>
	)
}