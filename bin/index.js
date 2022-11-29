#!/usr/bin/env node
const package = require('../package.json');

const htmlomatic = require('../index').run;
const { program } = require('commander');

program
    .name(package.name)
    .description(package.description)
    .version(package.version)
    .option('-o,--output <output>', 'The directory to write built files to.')
    .action(opts => {
        htmlomatic({
            files: program.args,
            output: opts.output,
        });
    });

program.parse();
