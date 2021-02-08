(() => {
	const fs = require('fs-extra');
	const _currenBase = process.cwd();
	const shell = require('shelljs');
	/**
	 * write the boirleplate into dir
	 * @param {String} dir absolute path
	 * @param {String} name Project name
	 */
	async function writeTemplate (dir, name) {
		let path = dir || _currenBase;
		if(fs.existsSync(path + '/' + name)) {
			console.log('#>- path exist, won\'t be override');
			process.exit(1);
		} else {
			try {
				shell.cd(path);
				await clone(name);
			} catch (err) {
				console.error('error writing the template => ', err);
			}
		}
	}
	/**
	 * Clone github boilerplate
	 * @param {*} name
	 * @param {*} dir
	 */
	function clone(name = 'metaflux-biorleplate') {
		return new Promise((resolve, reject) => {
			console.log('#>- Creating ', name);
			let resp = shell.exec(`git clone https://github.com/rebelstackio/metaflux-boilerplate.git ${name}`, {async: true});
			resp.once('close', () => {
				console.log('#>- Cloning complete');
				resolve();
			})
			.once('error', (err) => {
				console.log('!>- Unhandled error: ', err.message);
				reject();
			})
		})
	}

	module.exports = { writeTemplate }
})();
