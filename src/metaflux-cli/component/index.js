(() => {
	const options = require('./options');
	const createComponent = require('../../lib/component');
	/**
	 * Create component sub-command
	 */
	function component (program) {
		const commandObject = program
		options.forEach(option => {
			commandObject.option(...option.command);
		});
		commandObject.command('component <name> [-d, --dir] [-t, --type]')
		.description('Create a new empty component')
		.action(async (name) => {
			let { dir, type } = commandObject;
			createComponent(type, name, dir);
		});
	}

	module.exports = component;
})()
