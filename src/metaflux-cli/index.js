(() => {
	const createSubCommand = require('./create');


	function metafluxCli(program) {
		program.description('Complete Metaflux project manager, see the usage with metaflux-cli --help')
		// create sub command
		createSubCommand(program);
	}

	module.exports = metafluxCli;
})();
