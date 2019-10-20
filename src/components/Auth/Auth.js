import React, { useContext } from 'react';

import Card from '../UI/Card/Card';
import { AuthContext } from '../../context/auth-context';
import { AuthStyle } from './AuthStyle';

const Auth = props => {
	const authContext = useContext(AuthContext);
	const loginHandler = () => {
		authContext.login();
	};

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
