const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { countBy, chain, sum, min, max, meanBy } = require('lodash');
const Datastore = require('nedb');

const { rarity } = require('./utils');

const database = new Datastore({
	filename: path.resolve(__dirname, '../data/rewards.json'),
	autoload: true
});

const process = (type = 'easy') => {
	database.find({ type }).exec((err, docs) => {
		if (err) {
			console.log(chalk.red(`Error reading database: ${err}`));
			return;
		}

		console.log(`⚙️  Processing ${chalk.bold(docs.length)} ${rarity(type)} clues`);

		const rolls = calcRolls(docs);
		const items = calcItems(docs);
		const quantities = calcQuantities(docs);

		console.log(
			`🎲 Between ${chalk.bold(min(rolls.values))} & ${chalk.bold(max(rolls.values))} rolls`
		);
		console.log(`🎁 From ${chalk.bold(items.values.length)} different items`);
		console.log(
			`💰 With an average value of ${chalk.yellow.bold(meanBy(docs, 'price').toFixed(0))}`
		);

		const file = path.resolve(__dirname, '../data', `${type}.json`);
		fs.writeJsonSync(file, {
			rolls,
			items,
			quantities
		});

		console.log(`💾 Saved to ${chalk.green(file)}\n`);
	});
};

const calcRolls = docs => {
	const items = countBy(docs, x => x.items.length);

	return {
		values: Object.keys(items),
		weights: normalize(Object.values(items))
	};
};

const calcItems = docs => {
	const items = chain(docs)
		.map(doc => doc.items)
		.flatten()
		.countBy('id')
		.value();

	return {
		values: Object.keys(items),
		weights: normalize(Object.values(items))
	};
};

const calcQuantities = docs => {
	return chain(docs)
		.map(doc => doc.items)
		.flatten()
		.groupBy('id')
		.toPairs()
		.map(x => [x[0], x[1].map(y => y.amount)])
		.map(x => [x[0], countBy(x[1])])
		.map(x => [x[0], { values: Object.keys(x[1]), weights: normalize(Object.values(x[1])) }])
		.fromPairs()
		.value();
};

const normalize = array => {
	const total = sum(array);

	return array.map(val => parseFloat((val / total).toFixed(4)));
};

process('easy');
process('medium');
process('hard');
process('elite');
process('master');
