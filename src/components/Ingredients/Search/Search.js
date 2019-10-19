import React from 'react';

import Card from '../../UI/Card/Card';
import { SearchStyle, InputStyle } from './SearchStyle';

const Search = React.memo(props => {
	return (
		<SearchStyle>
			<Card>
				<InputStyle>
					<label>Filter by Title</label>
					<input type='text' />
				</InputStyle>
			</Card>
		</SearchStyle>
	);
});

export default Search;
