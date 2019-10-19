import React, { useState } from 'react';

import Card from '../../UI/Card/Card';
import LoadingIndicator from '../../UI/LoadingIndicator/LoadingIndicator';
import { IngredientFormStyle, FormControlStyle, IngredientFormActions } from './IngredientFormStyle';

const IngredientForm = React.memo(props => {
	const [ title, setTitle ] = useState('');
	const [ amount, setAmount ] = useState('');
	const submitHandler = event => {
		event.preventDefault();
		props.onAddIngredient({ title, amount });
	};

	return (
		<IngredientFormStyle>
			<Card>
				<form onSubmit={submitHandler}>
					<FormControlStyle>
						<label htmlFor='title'>Name</label>
						<input type='text' id='title' value={title} onChange={event => setTitle(event.target.value)} />
					</FormControlStyle>
					<FormControlStyle>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							value={amount}
							onChange={event => setAmount(event.target.value)}
						/>
					</FormControlStyle>
					<IngredientFormActions>
						<button type='submit'>Add Ingredient</button>
						{props.loading && <LoadingIndicator />}
					</IngredientFormActions>
				</form>
			</Card>
		</IngredientFormStyle>
	);
});

export default IngredientForm;
