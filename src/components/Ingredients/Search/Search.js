import React, { useState, useEffect, useRef } from 'react';

import Card from '../../UI/Card/Card';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import useHttp from '../../../hooks/http';
import { SearchStyle, InputStyle } from './SearchStyle';

const Search = React.memo(props => {
	const { onLoadIngredients } = props;
	const [ filter, setFilter ] = useState('');
	const inputRef = useRef();
	const { isLoading, error, data, sendRequest, clear } = useHttp();

	useEffect(
		() => {
			const timer = setTimeout(() => {
				if (filter === inputRef.current.value) {
					const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
					sendRequest('https://start-hooks-udemy.firebaseio.com/ingredients.json' + query, 'GET');
				}
			}, 500);
			return () => {
				clearTimeout(timer);
			};
		},
		[ filter, inputRef, sendRequest ]
	);

	useEffect(
		() => {
			if (!isLoading && !error && data) {
				const loadingIngredients = [];
				for (const key in data) {
					loadingIngredients.push({
						id: key,
						title: data[key].title,
						amount: data[key].amount
					});
				}
				onLoadIngredients(loadingIngredients);
			}
		},
		[ data, isLoading, error, onLoadIngredients ]
	);
	return (
		<SearchStyle>
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
			<Card>
				<InputStyle>
					<label>Filter by Title</label>
					{isLoading && <span>Loading...</span>}
					<input
						ref={inputRef}
						type='text'
						value={filter}
						onChange={event => setFilter(event.target.value)}
					/>
				</InputStyle>
			</Card>
		</SearchStyle>
	);
});

export default Search;
