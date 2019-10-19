import React, { useState, useEffect, useRef } from 'react';

import Card from '../../UI/Card/Card';
import { SearchStyle, InputStyle } from './SearchStyle';

const Search = React.memo(props => {
	const { onLoadIngredients } = props;
	const [ filter, setFilter ] = useState('');
	const inputRef = useRef();
	useEffect(
		() => {
			setTimeout(() => {
				if (filter === inputRef.current.value) {
					const query = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
					fetch('https://start-hooks-udemy.firebaseio.com/ingredients.json' + query)
						.then(res => res.json())
						.then(resData => {
							const loadingIngredients = [];
							for (const key in resData) {
								loadingIngredients.push({
									id: key,
									title: resData[key].title,
									amount: resData[key].amount
								});
							}
							onLoadIngredients(loadingIngredients);
						});
				}
			}, 500);
		},
		[ filter, onLoadIngredients, inputRef ]
	);
	return (
		<SearchStyle>
			<Card>
				<InputStyle>
					<label>Filter by Title</label>
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
