import React, { useReducer, useState, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from '../IngredientForm/IngredientForm';
import IngredientList from '../IngredientList/IngredientList';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import Search from '../Search/Search';
import useHttp from '../../../hooks/http';

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
	const { isLoading, error, data, sendRequest, reqExtra, reqIdentifer } = useHttp();

	// const [ userIngredients, setUserIngredients ] = useState([]);
	// const [ isLoading, setIsLoading ] = useState(false);
	// const [ error, setError ] = useState();

	// useEffect(
	// 	() => {
	// 		// console.log('Renderimg', userIngredients);
	// 		if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
	// 			dispatch({ type: 'DELETE', id: reqExtra });
	// 		} else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
	// 			dispatch({ type: 'ADD', ingredient: { id: data.name, ...reqExtra } });
	// 		}
	// 	},
	// 	[ data, reqExtra, reqIdentifer, isLoading, error ]
	// );

	useEffect(
		() => {
			if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
				dispatch({ type: 'DELETE', id: reqExtra });
			} else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
				dispatch({
					type: 'ADD',
					ingredient: { id: data.name, ...reqExtra }
				});
			}
		},
		[ data, reqExtra, reqIdentifer, isLoading, error ]
	);

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		dispatch({ type: 'SET', ingredient: filteredIngredients });
	}, []);

	const addIngredientHandler = useCallback(
		ingredient => {
			sendRequest(
				'https://start-hooks-udemy.firebaseio.com/ingredients.json',
				'POST',
				JSON.stringify(ingredient),
				ingredient,
				'ADD_INGREDIENT'
			);
		},
		[ sendRequest ]
	);

	const removeIngredientHandler = useCallback(
		ingredientId => {
			console.log('removeIngredientHandler');
			sendRequest(
				`https://start-hooks-udemy.firebaseio.com/ingredients/${ingredientId}.json`,
				'DELETE',
				null,
				ingredientId,
				'REMOVE_INGREDIENT'
			);
		},
		[ sendRequest ]
	);

	const clearError = useCallback(() => {
		// dispatchHttp({ type: 'CLEAR' });
		// setError(null);
	}, []);

	const ingredientList = useMemo(
		() => {
			return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />;
		},
		[ userIngredients, removeIngredientHandler ]
	);
	return (
		<div>
			{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
			<IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				{ingredientList}
			</section>
		</div>
	);
};

export default Ingredients;
