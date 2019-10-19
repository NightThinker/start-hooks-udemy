import React, { useReducer, useState, useEffect, useCallback } from 'react';

import IngredientForm from '../IngredientForm/IngredientForm';
import IngredientList from '../IngredientList/IngredientList';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import Search from '../Search/Search';

const ingredientReducer = (currentIngredients, action) => {
	switch (action.type) {
		case 'SET':
			return action.ingredient;
		case 'ADD':
			return [ ...currentIngredients, action.ingredient ];
		case 'DELETE':
			return currentIngredients.filter(ing => ing.id !== action.id);

		default:
			throw Error('Should not get there!');
	}
};

const Ingredients = () => {
	const [ userIngredients, dispatch ] = useReducer(ingredientReducer, []);
	// const [ userIngredients, setUserIngredients ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();

	useEffect(
		() => {
			console.log('Renderimg', userIngredients);
		},
		[ userIngredients ]
	);

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		dispatch({ type: 'SET', ingredient: filteredIngredients });
		// setUserIngredients(filteredIngredients);
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
				dispatch({ type: 'ADD', ingredient: { id: resData.name, ...ingredient } });
				// setUserIngredients(prevIngredients => [ ...prevIngredients, { id: resData.name, ...ingredient } ]);
			});
	};

	const removeIngredientHandler = ingredientId => {
		setIsLoading(true);
		fetch(`https://start-hooks-udemy.firebaseio.com/ingredients/${ingredientId}.json`, {
			method: 'DELETE'
		})
			.then(res => {
				setIsLoading(false);
				dispatch({ type: 'DELETE', id: ingredientId });
				// setUserIngredients(prevIngredients =>
				// 	prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
				// );
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
