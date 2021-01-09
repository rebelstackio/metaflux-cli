(() => {
	const options = require('./options');
	const { writeTemplate } = require('../../lib');
	const componentSubCommand = require('../component');
	/**
	 * SubCommand Create
	 */
	function create(program) {
		const commandObject = program
		options.forEach(option => {
			commandObject.option(...option.command);
		});
		commandObject.command('create [name]')
		.description('Create a new empty project')
		.action(async (name) => {
			let { dir } = commandObject;
			await writeTemplate(dir, name)
			process.exit(0);
		});
	}

	module.exports = create;
})();
