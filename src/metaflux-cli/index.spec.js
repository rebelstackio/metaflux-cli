const shell = require('shelljs');
const path = require('path');
const fs = require('fs-extra');
// clean the testing folder
//shell.rm('-rf', './unit_test_tmp/');
//shell.mkdir('./unit_test_tmp/');
// go to the testing folder
shell.cd('./unit_test_tmp/');

async function cli(args) {
	// execute relative to this file
	return await shell.exec(`node ${path.resolve('./index')} ${args.join(' ')}`, { silent: true });
}

test('If no args should exit with 1 code', async () => {
	const resp = await cli([]);
	expect(resp.code).toBe(1)
});

