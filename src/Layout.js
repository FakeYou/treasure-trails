import React from 'react';
import styled from 'styled-components';

import Buttons from './components/Buttons';
import Items from './components/Items';
import Clues from './components/Clues';

const Screen = styled.div`
	display: grid;
	grid-template-columns: minmax(323px, 1fr) 0.6fr;
	grid-gap: 1px;
	grid-template-areas: 'clues items';
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 0.2rem;
`;

const Content = styled.div`
	grid-area: clues;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Column = styled.div`
	align-items: flex-start;
	grid-area: items;
	padding: 20px;
`;

const Layout = () => (
	<Screen>
		<Column>
			<Buttons />
			<Items />
		</Column>
		<Content>
			<Clues />
		</Content>
	</Screen>
);

export default Layout;
