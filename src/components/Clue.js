import React from 'react';
import styled from 'styled-components';

import Item from './Item';
import parchment from '../assets/parchment.png';
import chest from '../assets/chest.png';

const Container = styled.div`
	background: url(${parchment});
	position: relative;
	height: 286px;
	width: 303px;
	align-self: center;
	margin: 10px;
`;

const Items = styled.div`
	position: absolute;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	top: 78px;
	left: 130px;
	width: 108px;
`;

const Chest = styled.div`
	position: absolute;
	background: url(${chest});
	image-rendering: pixelated;
	width: 92px;
	height: 92px;
	top: 138px;
	left: 34px;
`;

const Clue = ({ rewards, className, style }) => (
	<Container className={className} style={style}>
		<Items>
			{rewards.map(reward => (
				<Item key={reward.id} id={reward.id} amount={reward.amount} />
			))}
		</Items>
		<Chest />
	</Container>
);

export default Clue;
