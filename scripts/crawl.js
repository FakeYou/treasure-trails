const path = require('path');
const axios = require('axios');
const querystring = require('query-string');
const chalk = require('chalk');
const Datastore = require('nedb');

const { valuable, rarity } = require('./utils');
const names = require('../data/names');

const COOLDOWN = 5000;
const HIGHLIGHTS = [
	/3rd age/,
	/gilded/,
	/ring of coins/,
	/ring of nature/,
	/ankou/,
	/mummy/,
	/crystal key/,
	/tuxedo/,
	/bow tie/,
	/monk\'s robe/
];

const client = axios.create({
	baseURL: 'https://rsbuddy.com',
	headers: {
		'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0`,
		Cookie: `__cfduid=da480557e9c72a888ffcb299e4bfb73e51538460519; cf_clearance=608c6d03c2a61f334401e96e39a47089fa3b988c-1538460523-2592000-150`
	}
});

const database = new Datastore({
	filename: path.resolve(__dirname, '../data/rewards.json'),
	autoload: true
});

const poll = async () => {
	const query = querystring.stringify({
		ts: Date.now() - COOLDOWN,
		dn: 'Global',
		m: 4
	});

	try {
		const response = await client.get(`/cluescroll?${query}`);
		const rewards = response.data;

		const records = rewards.map(reward => {
			const items = reward.items
				.map(item => {
					const name = names[item.id] || chalk.bgRed(item.id);
					const highlight = HIGHLIGHTS.filter(x => x.test(name.toLowerCase())).length > 0;
					const color = highlight ? chalk.bgGreen : chalk.white;

					return color(`${item.amount} ${name}`);
				})
				.join(', ');

			const color = reward.price > 10000000 ? chalk.bgGreen : chalk.white;

			console.log(
				color(
					`📜 ${rarity(reward.type)} worth ${chalk.yellow.bold(reward.price)} containing ${items}`
				)
			);

			return {
				_id: `${reward.type}-${reward.ts}-${reward.price}`,
				...reward
			};
		});

		database.insert(records);
	}
	catch (e) {
		console.log(chalk.red(`Error getting rewards: ${e.message}`));
	}
};

poll();
setInterval(poll, COOLDOWN);
