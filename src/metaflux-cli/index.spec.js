const shell = require('shelljs');
const path = require('path');
const fs = require('fs-extra');

// go to the testing folder
shell.cd('./unit_test_tmp/');

async function cli(args) {
	// execute relative to this file
	return await shell.exec(`node ${path.resolve('./index')} ${args.join(' ')}`);
}

test('If no args should exit with 1 code', async () => {
	const resp = await cli([]);
	expect(resp.code).toBe(1)
});

test('Create should add new folder', async () => {
	await cli(['create', 'test_new_project'])
	const exists = fs.existsSync('./test_new_project');
	expect(exists).toBe(true)
})

test('Create should exit with 1 code if the folder exists', async () => {
	const resp = await cli(['create', 'test_new_project'])
	expect(resp.code).toBe(1)
})
