import styled from 'styled-components';

export const IngredientFormStyle = styled.section`
	width: 30rem;
	margin: 2rem auto;
	max-width: 80%;
`;

export const FormControlStyle = styled.div`
	label,
	input {
		display: block;
		width: 100%;
	}
	input {
		font: inherit;
		padding: 0.1rem 0.25rem;
		border: none;
		border-bottom: 2px solid #ccc;
		margin-bottom: 1rem;
		&:focus {
			outline: none;
			border-bottom-color: #ff2058;
		}
	}
`;

export const IngredientFormActions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
