#!/usr/bin/env node

'use strict';

const gradient = require('gradient-string');
const program = require('commander');
const metafluxCli = require('./src/metaflux-cli');
// Program version.
program.version(require('./package.json').version);

const title = '#####__METAFLUX-CLI__#####'
console.log('\n' + gradient.rainbow(title) + '\n');

metafluxCli(program);

program.parse(process.argv);
