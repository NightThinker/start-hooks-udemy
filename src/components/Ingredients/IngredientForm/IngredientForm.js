import React from 'react';

import Card from '../../UI/Card/Card';
import { IngredientFormStyle, FormControlStyle, IngredientFormActions } from './IngredientFormStyle';

const IngredientForm = React.memo(props => {
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
						<input type='text' id='title' />
					</FormControlStyle>
					<FormControlStyle>
						<label htmlFor='amount'>Amount</label>
						<input type='number' id='amount' />
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
