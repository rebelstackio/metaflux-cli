const run = require('./index');
const shell = require('shelljs');

jest.mock('shelljs');
shell.exec = jest.fn();
const execMock = shell.exec;

beforeEach(() => {
	execMock.mockReset();
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
	cli(true);
	//expect(resp).toEqual(null);
	expect(execMock).toHaveBeenCalledTimes(1);
	expect(execMock).toHaveBeenCalledWith('npm start', {"silent": true});
});
