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

it('should call npm start if dependencies are installed', () => {
	// this means it has node_modules folder;
	existsSync.mockReturnValueOnce(true);

	cli(true);
	expect(existsSync).toHaveBeenCalledTimes(1);
	expect(existsSync).toHaveBeenCalledWith('node_modules/');
	///
	expect(execMock).toHaveBeenCalledTimes(1);
	expect(execMock).toHaveBeenCalledWith('npm start', {"silent": true});
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
