import React, { Fragment } from 'react';
import { Subscribe } from 'unstated';

import Store, { DIFFICULTY } from '../Store';

const Buttons = () => (
	<Subscribe to={[Store]}>
		{store => (
			<Fragment>
				<h3>
					Opened {store.state.clues.length} {store.state.difficulty}{' '}
					{store.state.clues.length === 1 ? 'clue' : 'clues'}
				</h3>
				<div class="form-group">
					<button
						className="btn btn-primary mr-1"
						onClick={() => store.openCasket()}
						disabled={store.state.isOpening}
					>
						Open single casket
					</button>
					<button
						className="btn btn-primary mr-1"
						onClick={() => (store.state.isOpening ? store.stop() : store.start())}
					>
						{store.state.isOpening ? 'Stop' : 'Auto-open'}
					</button>
				</div>
				<div class="form-group">
					<select
						className="form-select"
						value={store.state.difficulty}
						onChange={e => store.setDifficulty(e.target.value)}
						placeholder="Difficulty"
					>
						<option value={DIFFICULTY.EASY}>Easy clues</option>
						<option value={DIFFICULTY.MEDIUM}>Medium clues</option>
						<option value={DIFFICULTY.HARD}>Hard clues</option>
						<option value={DIFFICULTY.ELITE}>Elite clues</option>
						<option value={DIFFICULTY.MASTER}>Master clues</option>
					</select>
				</div>

				<p>
					Press on any item(s) to highlight them. When a clue containing any of these items is
					opened it will automatically pause opening.
				</p>
			</Fragment>
		)}
	</Subscribe>
);

export default Buttons;
