#!/usr/bin/env node

'use strict';

const gradient = require('gradient-string');
const program = require('commander');
const metafluxCli = require('./src/metaflux-cli');

program.version(require('./package.json').version);
program.command('metaflux-cli [create, dir]');

const title = '#####__METAFLUX-CLI__#####'
console.log('\n' + gradient.rainbow(title) + '\n');

metafluxCli(program);

program.parse(process.argv);
