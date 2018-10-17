import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinning = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const Container = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
	align-items: center;
	justify-content: center;
`;

const Spinner = styled.div`
	width: 20px;
	height: 20px;
	border: 5px solid #c53e37;
	border-radius: 20px;
	border-top-color: #fff;
	animation: ${spinning} 0.75s linear infinite;
`;

console.log(spinning);

const Loading = () => (
	<Container>
		<Spinner />
	</Container>
);

export default Loading;
