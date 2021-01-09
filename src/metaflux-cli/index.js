(() => {
	const createSubCommand = require('./create');
	const componentSubCommand = require('./component');


	function metafluxCli(program) {
		program.description('Complete Metaflux project manager, see the usage with metaflux-cli --help')
		.usage('metaflux-cli <command> [options]')
		// create sub command
		createSubCommand(program);
		// Create new component sub-command
		componentSubCommand(program);
	}

	module.exports = metafluxCli;
})();
