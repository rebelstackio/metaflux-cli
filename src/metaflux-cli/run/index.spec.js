const run = require('./index');
const shell = require('shelljs');
const fs = require('fs-extra');
// mock dependencies
jest.mock('shelljs');
jest.mock('fs-extra');
shell.exec = jest.fn();
fs.existsSync = jest.fn();
const existsSync = fs.existsSync;
const execMock = shell.exec;

beforeEach(() => {
	execMock.mockReset();
	existsSync.mockReset();
});

function cli(silent, port) {
	// execute relative to this file
	return run(Object.assign({}, process, {
		option: function(param) { return this },
		description: function (param) { return this },
		action: (callable) => {
			callable()
		},
		command: function(param) { return this },
		silent,
		port
	}))
}

it('should call start webpack dev server if dependencies are installed', () => {
	// this means it has node_modules folder;
	existsSync.mockReturnValueOnce(true);

	cli(true);
	expect(existsSync).toHaveBeenCalledTimes(1);
	expect(existsSync).toHaveBeenCalledWith('node_modules/');
	///
	expect(execMock).toHaveBeenCalledTimes(1);
	expect(execMock).toHaveBeenCalledWith('./node_modules/.bin/webpack-dev-server  --mode development', {"silent": true});
});

it('should call npm install if dependencies aren\'t installed', () => {
	// this means it doesn't have node_modules folder;
	existsSync.mockReturnValueOnce(false);

	cli(true);
	expect(existsSync).toHaveBeenCalledTimes(1);
	expect(existsSync).toHaveBeenCalledWith('node_modules/');
	///
	expect(execMock).toHaveBeenCalledTimes(1);
	expect(execMock).toHaveBeenCalledWith('npm install', {"silent": true});
});

it('if port is set should call start webpack dev server with port', () => {
	// this means it has node_modules folder;
	existsSync.mockReturnValueOnce(true);
	cli(true, 4000);
	expect(execMock).toHaveBeenCalledTimes(1);
	expect(execMock).toHaveBeenCalledWith('./node_modules/.bin/webpack-dev-server  --mode development --port 4000', {"silent": true});
})
