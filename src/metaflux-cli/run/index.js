(() => {
	const shell = require('shelljs');
	const fs = require('fs-extra');
	/**
	 * Start Dev server sub-command
	 */
	function run (program) {
		const commandObject = program
		commandObject.command('run')
		.description('Run your project in Dev mode')
		.action(async function () {
			if(!fs.existsSync('node_modules/')) {
				console.log('#>- Installing dependencies, this may take a couple of minutes');
				await shell.exec('npm install', { silent: true });
				console.log('#>- Done')
			}
			const {stdout} =  shell.exec('npm start', { silent: true, async: true });
			console.log('#>- Start / watch Dev Server');
			stdout.on('data', (chunk) => {
				console.log(chunk);
			});
		});
	}

	module.exports = run;
})()
