import React, { Fragment } from 'react';
import styled from 'styled-components';
import isNumber from 'lodash/isNumber';

import Amount from './Amount';

import spritesheet from '../assets/spritesheet.png';
import items from '../../data/names';

const IDS = Object.keys(items);
const COLUMNS = 16;
const WIDTH = 36;
const HEIGHT = 32;

const Sprite = styled.div`
	position: relative;
	background: url(${spritesheet});
	image-rendering: pixelated;
	width: ${WIDTH};
	height: ${HEIGHT};
`;

const Quantity = styled(Amount)`
	position: absolute;
	left: 1px;
	top: 0px;
`;

const Item = ({ id, name, stackable, amount, style, className }) => {
	const index = IDS.indexOf(id);
	const x = -(index % COLUMNS) * WIDTH;
	const y = -Math.floor(index / COLUMNS) * HEIGHT;

	return (
		<Sprite
			title={name}
			className={className}
			style={{
				...style,
				backgroundPositionX: x,
				backgroundPositionY: y
			}}
		>
			{isNumber(amount) &&
				(stackable || amount === 0 || amount > 1) && <Quantity>{amount}</Quantity>}
		</Sprite>
	);
};

export default Item;
