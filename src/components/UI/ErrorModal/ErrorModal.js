import React from 'react';

import { ErrorModalStyle, BackDropStyle, ErrorModalActionsStyle } from './ErrorModalStyle';

const ErrorModal = React.memo(props => {
	return (
		<React.Fragment>
			<BackDropStyle onClick={props.onClose} />
			<ErrorModalStyle>
				<h2>An Error Occurred!</h2>
				<p>{props.children}</p>
				<ErrorModalActionsStyle>
					<button type='button' onClick={props.onClose}>
						Okay
					</button>
				</ErrorModalActionsStyle>
			</ErrorModalStyle>
		</React.Fragment>
	);
});

export default ErrorModal;
