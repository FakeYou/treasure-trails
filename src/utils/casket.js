import weightedRandom from 'weighted-random';
import times from 'lodash/times';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

let items = {};
let types = {};

const load = async () => {
	items = await import('../../data/items');
	types.easy = await import('../../data/easy');
	types.medium = await import('../../data/medium');
	types.hard = await import('../../data/hard');
	types.elite = await import('../../data/elite');
	types.master = await import('../../data/master');
};

// load();

const openCasket = type => {
	const data = types[type];

	const rolls = data.rolls.values[weightedRandom(data.rolls.weights)];
	const rewards = uniqBy(
		times(rolls, () => {
			const item = data.items.values[weightedRandom(data.items.weights)];
			const amount = data.quantities[item].values[weightedRandom(data.quantities[item].weights)];
			return { id: item, amount: parseInt(amount) };
		}),
		'id'
	);

	return rewards;
};

const possibleItems = type => {
	const data = types[type];
	const names = items;

	if (!data) {
		return [];
	}

	return sortBy(data.items.values.map(id => ({ id, name: names[id] })), 'name');
};

export { openCasket, possibleItems };
