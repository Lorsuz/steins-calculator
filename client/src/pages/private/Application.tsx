import React from 'react';
import { Link } from 'react-router-dom';

function Application(): React.FunctionComponentElement<JSX.Element> {
	return (
		<div>
			<h1>Application</h1>
			<p>This is a private route.</p>
			<Link to='../profile'>click here for have access to profile</Link>
		</div>
	);
}

export default Application;
