import React from 'react';

import { IngredientListStyle } from './IngredientListStyle';

const IngredientList = React.memo(props => {
	console.log('Render List');
	return (
		<IngredientListStyle>
			<h2>Loaded Ingredients</h2>
			<ul>
				{props.ingredients.map(ig => (
					<li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
						<span>{ig.title}</span>
						<span>{ig.amount}x</span>
					</li>
				))}
			</ul>
		</IngredientListStyle>
	);
});

export default IngredientList;
