import React from 'react';

import IngredientForm from '../IngredientForm/IngredientForm';
import Search from '../Search/Search';

function Ingredients() {
	return (
		<div>
			<IngredientForm />

			<section>
				<Search />
				{/* Need to add list here! */}
			</section>
		</div>
	);
}

export default Ingredients;
