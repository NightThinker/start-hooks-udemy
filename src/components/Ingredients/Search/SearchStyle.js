import styled from 'styled-components';

export const SearchStyle = styled.section`
	width: 30rem;
	margin: 2rem auto;
	max-width: 80%;
`;

export const InputStyle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	input {
		font: inherit;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 0.15rem 0.25rem;
		&:focus {
			outline: none;
			border-color: #ff2058;
		}
	}
	@media (min-width: 768px) {
		flex-direction: row;
	}
`;
