const chalk = require('chalk');

const valuable = amount => (amount > 10000000 ? chalk.bgGreen : chalk.white);
const rarity = type => {
	return {
		master: chalk.red.bold,
		elite: chalk.yellow.bold,
		hard: chalk.green.bold,
		medium: chalk.cyan.bold,
		easy: chalk.white.bold
	}[type](type);
};

module.exports = {
	valuable,
	rarity
};
