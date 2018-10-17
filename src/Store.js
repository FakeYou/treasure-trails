import produce from 'immer';
import { Container } from 'unstated';
import weightedRandom from 'weighted-random';
import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
import times from 'lodash/times';
import intersection from 'lodash/intersection';

class Store extends Container {
	static DIFFICULTY = {
		EASY: 'easy',
		MEDIUM: 'medium',
		HARD: 'hard',
		ELITE: 'elite',
		MASTER: 'master'
	};

	state = {
		isLoading: true,
		isOpening: false,
		difficulty: Store.DIFFICULTY.EASY,
		wishlist: [],
		clues: [],
		items: {},
		total: {},
		speed: 550
	};

	constructor() {
		super();

		this.load();
	}

	load = async () => {
		const items = await import('../data/items');
		const easy = await import('../data/easy');
		const medium = await import('../data/medium');
		const hard = await import('../data/hard');
		const elite = await import('../data/elite');
		const master = await import('../data/master');

		this.setState(
			produce(draft => {
				draft.ids = Object.keys(items);
				draft.items = items;
				draft.easy = easy;
				draft.medium = medium;
				draft.hard = hard;
				draft.elite = elite;
				draft.master = master;
				draft.isLoading = false;
			})
		);
	};

	setDifficulty = difficulty => {
		this.setState(
			produce(draft => {
				draft.difficulty = difficulty;
			})
		);

		this.clear();
		this.stop();
	};

	toggleWishlist = id =>
		this.setState(
			produce(draft => {
				const index = draft.wishlist.indexOf(id);

				if (index === -1) {
					draft.wishlist.push(id);
				}
				else {
					draft.wishlist.splice(index, 1);
				}
			})
		);

	getItems = difficulty => {
		return filter(Object.values(this.state.items), item => item.difficulties.includes(difficulty));
	};

	openCasket = () => {
		const key = `${Date.now()}-${(Math.random() * 6).toFixed()}`;
		const data = this.state[this.state.difficulty];

		const rolls = data.rolls.values[weightedRandom(data.rolls.weights)];
		const rewards = uniqBy(
			times(rolls, () => {
				const item = data.items.values[weightedRandom(data.items.weights)];
				const amount = data.quantities[item].values[weightedRandom(data.quantities[item].weights)];
				return { id: item, amount: parseInt(amount) };
			}),
			'id'
		);

		this.setState(
			produce(draft => {
				draft.clues.unshift({ key, rewards });

				rewards.forEach(({ id, amount }) => {
					draft.total[id] = (draft.total[id] || 0) + amount;
				});
			})
		);

		return rewards;
	};

	start = () => {
		clearInterval(this.interval);

		this.interval = setInterval(() => {
			const rewards = this.openCasket();

			const ids = rewards.map(reward => reward.id);

			if (intersection(ids, this.state.wishlist).length > 0) {
				this.stop();
			}
		}, this.state.speed);

		this.setState(
			produce(draft => {
				draft.isOpening = true;
			})
		);
	};

	stop = () => {
		clearInterval(this.interval);
		this.setState(
			produce(draft => {
				draft.isOpening = false;
			})
		);
	};

	clear = () => {
		this.setState(
			produce(draft => {
				draft.total = {};
				draft.clues = [];
				draft.wishlist = [];
			})
		);
	};
}

export default Store;
export const DIFFICULTY = Store.DIFFICULTY;
