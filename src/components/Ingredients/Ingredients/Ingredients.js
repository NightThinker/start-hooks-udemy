import React, { useState } from 'react';

import IngredientForm from '../IngredientForm/IngredientForm';
import IngredientList from '../IngredientList/IngredientList';
import Search from '../Search/Search';

const Ingredients = () => {
	const [ userIngredients, setUserIngredients ] = useState([]);

	const addIngredientHandler = ingredient => {
		setUserIngredients(prevIngredients => [ ...prevIngredients, { id: Math.random().toString(), ...ingredient } ]);
	};
	return (
		<div>
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search />
				<IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
			</section>
		</div>
	);
};

export default Ingredients;
