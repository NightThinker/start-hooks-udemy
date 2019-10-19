import React from 'react';

import Card from '../UI/Card/Card';
import { AuthStyle } from './AuthStyle';

const Auth = props => {
	const loginHandler = () => {};

	return (
		<AuthStyle>
			<Card>
				<h2>You are not authenticated!</h2>
				<p>Please log in to continue.</p>
				<button onClick={loginHandler}>Log In</button>
			</Card>
		</AuthStyle>
	);
};

export default Auth;
