const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const sharp = require('sharp');
const Progress = require('cli-progress');

const items = require('../data/items');

const COOLDOWN = 10;
const WIDTH = 36;
const HEIGHT = 32;
const COLUMNS = 16;

const client = axios.create({
	baseURL: 'https://rsbuddy.com',
	headers: {
		'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0`,
		Cookie: `__cfduid=da480557e9c72a888ffcb299e4bfb73e51538460519; cf_clearance=608c6d03c2a61f334401e96e39a47089fa3b988c-1538460523-2592000-150`
	}
});

const makeSpritesheet = async () => {
	try {
		const bar = new Progress.Bar({
			format: `📥 Fetching sprites ${chalk.green('{bar}')} ${chalk.green.bold('{percentage}%')}`,
			barCompleteChar: '▇',
			barIncompleteChar: '░'
		});

		const ids = Object.keys(items);
		const width = COLUMNS * WIDTH;
		const height = HEIGHT * Math.ceil(ids.length / COLUMNS);

		console.log(`🌠 Creating spritesheet with ${chalk.bold(ids.length)} items`);
		bar.start(ids.length, 0);

		let sheet = sharp(null, {
			create: {
				width,
				height,
				channels: 4,
				background: 'rgba(0, 0, 0, 0)'
			}
		}).png();

		for (let i = 0; i < ids.length; i++) {
			const sprite = await getSprite(ids[i]);
			const left = (i % COLUMNS) * WIDTH;
			const top = Math.floor(i / COLUMNS) * HEIGHT;

			sheet.overlayWith(sprite, { top, left });
			sheet = sharp(await sheet.toBuffer());

			bar.update(i + 1);

			await sleep(COOLDOWN);
		}

		bar.stop();

		console.log('💾 Saving spritesheet to ../data/spritesheet.png');
		await sheet.toFile(path.resolve(__dirname, '../data/spritesheet.png'));
	}
	catch (e) {
		console.log(e);
	}
};

const getSprite = async id => {
	try {
		const response = await client.get(`/items/${id}.png`, {
			responseType: 'arraybuffer'
		});
		return Buffer.from(response.data, 'binary');
	}
	catch (e) {
		console.log(chalk.red(`Error getting rewards: ${e.message}`));
	}
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

makeSpritesheet();
