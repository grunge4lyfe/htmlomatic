const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

// A string extension function to allow string splicing
String.prototype.splice = function(start, length, replacement) {
    return this.substring(0, start) + replacement + this.substring(start + length);
};

const parse = (data, root) => {
    const pattern = /<!--(\s+)#include(\s+)(.*)(\s+)-->/g;
    let output = data;

    while (match = pattern.exec(output)) {
        const include = fs.readFileSync(path.join(root, match[3]), 'utf-8');
        output = output.splice(match.index, match[0].length, include);
    }

    return output;
};

const run = config => {
    if (!config) return;

    const files = config.files || [];
    const silent = config.silent || false;

    for (const file of files) {
        glob(file, (err, matches) => {
            if (err) throw err;

            for (const match of matches) {
                const input = path.join(__dirname, match);
                if (!silent) console.log(`Processing input file ${input}...`);

                const template = fs.readFileSync(input, 'utf-8');
                const result = parse(template, path.resolve(match));

                if (!config.output) {
                    console.log(result);
                } else {
                    const file = path.join(__dirname, config.output, path.basename(match));

                    fs.mkdirSync(path.dirname(file), { recursive: true });
                    fs.writeFileSync(file, result, 'utf-8');

                    if (!silent) console.log(`Writing output file to ${file}`);
                }
            }
        });
    }
};

module.exports.parse = parse;
module.exports.run = run;