#!/usr/bin/env node
const package = require('../package.json');

const htmlomatic = require('../index').run;
const { program } = require('commander');

program
    .name(package.name)
    .description(package.description)
    .version(package.version)
    .option('-o,--output <output>', 'The directory to write built files to.')
    .option('-s,--silent', 'Surpresses command-line output entirely.')
    .action(opts => {
        htmlomatic({
            files: program.args,
            output: opts.output,
            silent: opts.silent,
        });
    });

program.parse();
