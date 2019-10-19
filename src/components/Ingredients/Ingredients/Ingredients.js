import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from '../IngredientForm/IngredientForm';
import IngredientList from '../IngredientList/IngredientList';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import Search from '../Search/Search';

const Ingredients = () => {
	const [ userIngredients, setUserIngredients ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();

	useEffect(
		() => {
			console.log('Renderimg', userIngredients);
		},
		[ userIngredients ]
	);

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		setUserIngredients(filteredIngredients);
	}, []);

	const addIngredientHandler = ingredient => {
		setIsLoading(true);
		fetch('https://start-hooks-udemy.firebaseio.com/ingredients.json', {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => {
				setIsLoading(false);
				return res.json();
			})
			.then(resData => {
				setUserIngredients(prevIngredients => [ ...prevIngredients, { id: resData.name, ...ingredient } ]);
			});
	};

	const removeIngredientHandler = ingredientId => {
		setIsLoading(true);
		fetch(`https://start-hooks-udemy.firebaseio.com/ingredients/${ingredientId}.json`, {
			method: 'DELETE'
		})
			.then(res => {
				setIsLoading(false);
				setUserIngredients(prevIngredients =>
					prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
				);
			})
			.catch(err => {
				// setError(err.message)
				setError('Somethine went wrong!');
				setIsLoading(false);
			});
	};

	const clearError = () => {
		setError(null);
	};
	return (
		<div>
			{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
			<IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				<IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
			</section>
		</div>
	);
};

export default Ingredients;
