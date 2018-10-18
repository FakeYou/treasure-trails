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
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const Spinner = styled.div`
	width: 16px;
	height: 16px;
	border: 3px solid #c53e37;
	border-radius: 20px;
	border-top-color: #fff;
	animation: ${spinning} 0.75s linear infinite;
`;

const Loading = () => (
	<Container>
		<Spinner />
	</Container>
);

export default Loading;
