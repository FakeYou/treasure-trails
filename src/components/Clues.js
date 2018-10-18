import React from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import { Subscribe } from 'unstated';
import styled, { keyframes } from 'styled-components';

import Store from '../Store';
import Clue from './Clue';

const enterClue = keyframes`
	from {
		transform: translate3d(0, -100px, 0) scale(0);
		opacity: -0.1;
	}

	to {
		transform: translate3d(0, 0, 0) scale(1);
		opacity: 1;
	}
`;

const moveList = keyframes`
	from {
		transform: translate3d(0, -306px, 0);
	}
	to {
		transform: translate3d(0, 0, 0);
	}
`;

const LatestClue = styled(Clue)`
	animation: ${enterClue} 0.15s ease-in-out;
`;

const CluesList = styled(List)`
	animation: ${moveList} 0.15s ease-in-out;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const Clues = () => (
	<Subscribe to={[Store]}>
		{store => (
			<WindowScroller>
				{({ height, isScrolling, scrollTop }) => (
					<div>
						{store.state.clues.length > 0 && <LatestClue {...store.state.clues[0]} />}
						<CluesList
							key={store.state.clues.length}
							autoHeight
							height={height + 400}
							isScrolling={isScrolling}
							rowCount={Math.max(store.state.clues.length - 1, 0)}
							rowHeight={306}
							rowRenderer={({ key, index, style }) => (
								<Row key={key} style={style}>
									<Clue rewards={store.state.clues[index + 1].rewards} />
								</Row>
							)}
							scrollTop={scrollTop}
							width={323}
						/>
					</div>
				)}
			</WindowScroller>
		)}
	</Subscribe>
);

export default Clues;
