import React, { Fragment } from 'react';
import styled from 'styled-components';

import characters from '../assets/characters.png';

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
	height: 9;
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
		<span style={style} className={className}>
			{string.split('').map((char, i) => (
				<Char
					key={i}
					style={{
						backgroundPositionX: -CHARS[char].left,
						backgroundPositionY: -y,
						width: CHARS[char].width
					}}
				/>
			))}
		</span>
	);
};

Amount.defaultProps = {
	children: '',
	style: null,
	className: null
};

export default Amount;
