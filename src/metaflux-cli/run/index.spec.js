const shell = require('shelljs');
const run = require('./index');

shell.cd('./unit_test_tmp/test_new_project/');

function cli(silent) {
	// execute relative to this file
	return run(Object.assign({}, process, {
		option: function(param) { return this },
		description: function (param) { return this },
		action: (callable) => {
			callable()
		},
		command: function(param) { return this },
		silent
	}))
}


it('Attempt 2', async (done) => {
	const spy = jest.spyOn(console, 'log');
	cli();
	console.warn(spy.mock.calls);
	expect(spy.mock.calls).toEqual([[
		"#>- Start / watch Dev Server you can end it with (ctrl + c)",
	]]);
	setTimeout(() => { done() }, 5000)
	//expect(process.exit).toHaveBeenCalledWith(0);
});

