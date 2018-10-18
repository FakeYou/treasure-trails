import React, { Fragment } from 'react';
import styled from 'styled-components';

import characters from '../assets/characters.png';
import { relative } from 'path';

const CHARS = {
	'1': { left: 0, width: 4 },
	'2': { left: 4, width: 7 },
	'3': { left: 11, width: 6 },
	'4': { left: 17, width: 5 },
	'5': { left: 22, width: 6 },
	'6': { left: 28, width: 7 },
	'7': { left: 35, width: 6 },
	'8': { left: 41, width: 7 },
	'9': { left: 48, width: 7 },
	'0': { left: 55, width: 7 },
	K: { left: 62, width: 6 },
	M: { left: 62, width: 7 }
};

const Char = styled.span`
	display: inline-block;
	background: url(${characters});
	image-rendering: pixelated;
	height: 9px;
`;

const Amount = ({ children, style, className }) => {
	const amount = parseInt(children, 10);
	let string = amount.toString();
	let y = 0;

	if (amount >= 10000000) {
		string = Math.floor(amount / 1000000) + 'M';
		y = 18;
	}
	else if (amount >= 100000) {
		string = Math.floor(amount / 1000) + 'K';
		y = 9;
	}

	return (
		<div style={style} className={className}>
			{string.split('').map((char, i) => (
				<Char
					key={i}
					style={{
						position: 'relative',
						top: 0,
						left: 0,
						backgroundPositionX: `${-CHARS[char].left}px`,
						backgroundPositionY: `${-y}px`,
						width: `${CHARS[char].width}px`
					}}
				/>
			))}
		</div>
	);
};

Amount.defaultProps = {
	children: '',
	style: null,
	className: null
};

export default Amount;
