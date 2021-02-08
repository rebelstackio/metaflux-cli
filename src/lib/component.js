(() => {
	const fs = require('fs-extra');
	const _currenBase = process.cwd();
	const _libBase = __dirname.slice(0,-3);
	/**
	 * Create new empty component
	 * @param {String} type Component type
	 * @param {String} name ComponentName
	 * @param {String} dir Directory
	 */
	function createComponent(type, name, dir) {
		let template = getType(type);
		template = fillTemplate(name, type,template);
		writeTemplate(dir, name, template, type);
	}
	/**
	 * Write template to file
	 */
	function writeTemplate (dir, name, template, type) {
		// set base for component or container from current directory
		let current = type === 'C'
			? (_currenBase + '/src/containers')
			: (_currenBase + '/src/components');
		let componentDir = dir ? dir : current;
		if (!fs.pathExistsSync(componentDir)){
			throw new TypeError(`Path ${componentDir} don't exists, make sure your in the root of you project or use --dir option`)
		}
		if (fs.pathExistsSync(componentDir + '/' + name)) {
			throw new TypeError(`Component ${name} already exists in ${componentDir}`);
		} else {
			// component folder
			let cf = componentDir + '/' + name;
			console.log('#>- Creating component in ', cf);
			fs.mkdirSync(cf);
			// write index.js
			fs.writeFileSync(cf + '/index.js', template, {encoding:'utf8'});
			// write index.css
			fs.writeFileSync(cf + '/index.css', '/*Your Styles here*/', {encoding:'utf8'})
			console.log('#>- Done.');
		}
	}
	/**
	 *
	 * @param {String} name ComponentName
	 * @param {String} type ComponentType
	 * @param {String} tpl_str FileString
	 */
	function fillTemplate(name, type, tpl_str) {
		tpl_str = tpl_str.replace(/(%{c_name})/g, name);
		if (type === 'c' || type === 'C') {
			let customName = getCustomElementName(name);
			tpl_str = tpl_str.replace(/(%{c_custom_name})/g, customName)
		}
		return tpl_str;
	}
	/**
	 * create compatible name for custom element (component-name)
	 * @param {String} name componentName
	 */
	function getCustomElementName(name) {
		if (name.match(/[A-Z]/g) === null) throw new TypeError('Component Name must be camelcase')
		return name.replace(/[A-Z]/g, (char) => {
			return `-${char.toLowerCase()}`
		});
	}

	/**
	 * Validate entered correct type, else set default type
	 * @param {String} type Component type
	 */
	function getType(type) {
		switch(type) {
			case 'f':
				return getFunctionComponentTemplate();
			case 'c':
				return getClassComponentTemplate();
			case 'C':
				return getContainerTemplate();
			default:
				console.log('Wrong type: ', type, '; Available types: c, f, C');
				return getFunctionComponentTemplate();
		}
	}
	/**
	 * getClassComponent template
	 */
	function getClassComponentTemplate () {
		const file = fs.readFileSync(
			`${_libBase}/lib/component-templates/classComponent.txt`,
			{encoding:'utf8', flag:'r'}
		);
		return file
	}

	/**
	 * getFunctionComponent template
	 */
	function getFunctionComponentTemplate () {
		const file = fs.readFileSync(
			`${_libBase}/lib/component-templates/functionComponent.txt`,
			{encoding:'utf8', flag:'r'}
		);
		return file
	}

	/**
	 * getContainer template
	 */
	function getContainerTemplate () {
		const file = fs.readFileSync(
			`${_libBase}/lib/component-templates/container.txt`,
			{encoding:'utf8', flag:'r'}
		);
		return file
	}

	module.exports = createComponent;
})()
