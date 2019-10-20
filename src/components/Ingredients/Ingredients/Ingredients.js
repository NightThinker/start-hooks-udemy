import React, { useReducer, useState, useEffect, useCallback, useMemo } from 'react';

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

const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return { loading: true, error: null };
		case 'RESPONSE':
			return { ...curHttpState, loading: false };
		case 'ERROR':
			return { loading: false, error: action.errorMessage };
		case 'CLEAR':
			return { ...curHttpState, error: null };

		default:
			throw Error('Should not be reached!');
	}
};

const Ingredients = () => {
	const [ userIngredients, dispatch ] = useReducer(ingredientReducer, []);
	const [ httpState, dispatchHttp ] = useReducer(httpReducer, { loading: false, error: null });
	// const [ userIngredients, setUserIngredients ] = useState([]);
	// const [ isLoading, setIsLoading ] = useState(false);
	// const [ error, setError ] = useState();

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

	const addIngredientHandler = useCallback(ingredient => {
		dispatchHttp({ type: 'SEND' });
		// setIsLoading(true);
		fetch('https://start-hooks-udemy.firebaseio.com/ingredients.json', {
			method: 'POST',
			body: JSON.stringify(ingredient),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => {
				dispatchHttp({ type: 'RESPONSE' });
				// setIsLoading(false);
				return res.json();
			})
			.then(resData => {
				dispatch({ type: 'ADD', ingredient: { id: resData.name, ...ingredient } });
				// setUserIngredients(prevIngredients => [ ...prevIngredients, { id: resData.name, ...ingredient } ]);
			});
	}, []);

	const removeIngredientHandler = useCallback(ingredientId => {
		dispatchHttp({ type: 'SEND' });
		// setIsLoading(true);
		fetch(`https://start-hooks-udemy.firebaseio.com/ingredients/${ingredientId}.json`, {
			method: 'DELETE'
		})
			.then(res => {
				dispatchHttp({ type: 'RESPONSE' });
				// setIsLoading(false);
				dispatch({ type: 'DELETE', id: ingredientId });
				// setUserIngredients(prevIngredients =>
				// 	prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
				// );
			})
			.catch(err => {
				// setError(err.message)
				dispatchHttp({ type: 'ERROR', errorMessage: 'Somethine went wrong!' });
				// setError('Somethine went wrong!');
				// setIsLoading(false);
			});
	}, []);

	const clearError = useCallback(() => {
		dispatchHttp({ type: 'CLEAR' });

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
			{httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
			<IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				{ingredientList}
			</section>
		</div>
	);
};

export default Ingredients;
