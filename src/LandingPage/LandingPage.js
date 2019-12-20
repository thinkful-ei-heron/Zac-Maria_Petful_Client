import React from 'react';

import { Link } from 'react-router-dom';

export default function LandingPage() {
	return(
		<section className='frontPage'>
			<p>The FIFO Pet Adoption Agency is an animal shelter which allows adoption of cats and dogs. These are the only two animals allowed in the shelter. The adoption process works strictly on a "First-In, First-Out" policy based on the animals that came to the shelter first. People can adopt a cat, or a dog, or both, but they may only adopt the animal that came to the shelter first. In addition, people who want to adopt are also put in a queue so they can adopt when it's their turn.</p>
			<Link to={'/adoption'}>Adopt now -></Link>
		</section>
	)
}