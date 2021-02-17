(() => {
	const shell = require('shelljs');
	const fs = require('fs-extra');
	const options = require('./options');
	/**
	 * Start Dev server sub-command
	 */
	async function run (program) {
		const commandObject = program
		options.forEach(option => {
			commandObject.option(...option.command);
		});
		commandObject.command('run')
		.description('Run your project in Dev mode')
		.action(async function () {
			const { silent, port } = commandObject;
			if(!fs.existsSync('node_modules/')) {
				console.log('#>- Installing dependencies, this may take a couple of minutes...');
				await shell.exec('npm install', { silent: true });
				console.log('#>- Done')
			}
			console.log('#>- Start / watch Dev Server you can end it with (ctrl + c)');
			if (!port) {
				await shell.exec('./node_modules/.bin/webpack-dev-server  --mode development', { silent: silent });
			} else {
				await shell.exec(`./node_modules/.bin/webpack-dev-server  --mode development --port ${port}`, { silent: silent });
			}
		});
	}

	module.exports = run;
})()
