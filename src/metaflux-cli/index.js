(() => {
	const createSubCommand = require('./create');
	const componentSubCommand = require('./component');
	const runSubCommadn = require('./run');

	function metafluxCli(program) {
		program.description('Complete Metaflux project manager, see the usage with metaflux-cli --help')
		.usage('metaflux-cli <command> [options]')
		// create sub command
		createSubCommand(program);
		// Create new component sub-command
		componentSubCommand(program);
		// create Run project sub-command
		runSubCommadn(program);
	}

	module.exports = metafluxCli;
})();
