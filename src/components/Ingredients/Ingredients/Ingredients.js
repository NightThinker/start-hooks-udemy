import React, { useState } from 'react';

import IngredientForm from '../IngredientForm/IngredientForm';
import IngredientList from '../IngredientList/IngredientList';
import Search from '../Search/Search';

const Ingredients = () => {
	const [ userIngredients, setUserIngredients ] = useState([]);

	const addIngredientHandler = ingredient => {
		fetch('https://start-hooks-udemy.firebaseio.com/ingredients.json', {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => {
				return res.json();
			})
			.then(resData => {
				setUserIngredients(prevIngredients => [ ...prevIngredients, { id: resData.name, ...ingredient } ]);
			});
	};

	const removeIngredientHandler = ingredientId => {
		setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
	};
	return (
		<div>
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search />
				<IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
			</section>
		</div>
	);
};

export default Ingredients;
