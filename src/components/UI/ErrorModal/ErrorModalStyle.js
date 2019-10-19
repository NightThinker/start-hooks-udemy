import styled from 'styled-components';

export const ErrorModalStyle = styled.div`
	position: fixed;
	top: 30vh;
	left: calc(50% - 15rem);
	width: 30rem;
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	z-index: 100;
	border-radius: 7px;
	h2 {
		margin: 0;
		padding: 1rem;
		background: #ff2058;
		color: white;
		border-radius: 7px 7px 0 0;
	}
	p {
		padding: 1rem;
	}
`;

export const BackDropStyle = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.75);
	z-index: 50;
`;

export const ErrorModalActionsStyle = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 0 0.5rem;
`;
