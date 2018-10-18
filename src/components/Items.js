import React, { Fragment } from 'react';
import { Subscribe } from 'unstated';
import styled from 'styled-components';

import Store, { DIFFICULTY } from '../Store';
import Item from './Item';
import Loading from './Loading';

import highlight from '../assets/highlight.png';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 0.6rem;
	background-color: #3c3429;
	border-radius: 0.2rem;
`;

const Wrapper = styled.div`
	background: ${props => (props.highlight ? `url(${highlight}) center no-repeat` : 'none')};
	opacity: ${props => (props.highlight || props.found ? 1 : 0.5)};
	padding: 0 0 2px 0;
	cursor: pointer;
`;

const Items = () => (
	<Subscribe to={[Store]}>
		{store => (
			<Container>
				{store.state.isLoading ? (
					<Loading />
				) : (
					<Fragment>
						{store.getItems(store.state.difficulty).map(item => (
							<Wrapper
								key={item.id}
								onClick={() => store.toggleWishlist(item.id)}
								highlight={store.state.wishlist.includes(item.id)}
								found={!!store.state.total[item.id]}
							>
								<Item
									{...item}
									amount={
										store.state.total[item.id] || (store.state.wishlist.includes(item.id) && 0)
									}
								/>
							</Wrapper>
						))}
					</Fragment>
				)}
			</Container>
		)}
	</Subscribe>
);

export default Items;
