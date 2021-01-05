(() => {
	const _options = require('./options');
	const { writeTemplate } = require('../lib');

	function metafluxCli(program) {
		const commandObject = program
		.description('Complete Metaflux project manager, see the usage with metaflux-cli --help')
		//.usage('[create, dir]');

		_options.forEach(option => {
			commandObject.option(...option.command);
		});

		commandObject.action(async () => {
			let { create, dir } = commandObject;
			if (create) {
				create = typeof create === 'boolean' ? undefined : create;
				console.log(create);
				await writeTemplate(dir, create)
			}
			process.exit(0);
		});
	}

	module.exports = metafluxCli;
})();
