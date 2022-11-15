#!/usr/bin/env node

const package = require('../package.json');
const { program } = require('commander');

program
    .name(package.name)
    .description(package.description)
    .version(package.version);

program.command('build')
    .description('test test test')
    .argument('<path>', 'path to the thing')
    .action((path, options) => {
        console.log('test');
    });

program.parse();