#!/usr/bin/env node
const package = require('../package.json');

const htmlomatic = require('../index').run;
const { program } = require('commander');

program
    .name(package.name)
    .description(package.description)
    .version(package.version);

program.command('build')
    .description('Builds the template files and writes them to the specified output.')
    .argument('<pattern>', 'The search pattern for template files (e.g. ./example/*.html)')
    .argument('<output>', 'The output directory for built files.')
    .action((pattern, output) => {
        htmlomatic({
            files: [pattern],
            output: output
        });
    });

program.parse();