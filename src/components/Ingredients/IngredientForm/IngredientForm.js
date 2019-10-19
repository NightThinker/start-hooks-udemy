import React, { useState } from 'react';

import Card from '../../UI/Card/Card';
import { IngredientFormStyle, FormControlStyle, IngredientFormActions } from './IngredientFormStyle';

const IngredientForm = React.memo(props => {
	const [ inputState, setInputState ] = useState({ title: '', amout: '' });
	const submitHandler = event => {
		event.preventDefault();
		// ...
	};

	return (
		<IngredientFormStyle>
			<Card>
				<form onSubmit={submitHandler}>
					<FormControlStyle>
						<label htmlFor='title'>Name</label>
						<input
							type='text'
							id='title'
							value={inputState.title}
							onChange={event => setInputState({ ...inputState, title: event.target.value })}
						/>
					</FormControlStyle>
					<FormControlStyle>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							value={inputState.amout}
							onChange={event => setInputState({ ...inputState, amout: event.target.value })}
						/>
					</FormControlStyle>
					<IngredientFormActions>
						<button type='submit'>Add Ingredient</button>
					</IngredientFormActions>
				</form>
			</Card>
		</IngredientFormStyle>
	);
});

export default IngredientForm;
