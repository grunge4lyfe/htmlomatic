const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
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

const htmlomatic = config => {
    assert(config);
    assert(config.files);

    for (const file of config.files) {
        glob(file, (err, matches) => {
            if (err) throw err;

            for (const match of matches) {

                const template = fs.readFileSync(match, 'utf-8');
                const output = parse(template, path.resolve(match));

                if (!config.output) {
                    console.log(output);
                } else {
                    const file = path.join(__dirname, config.output, path.basename(match));

                    fs.mkdirSync(path.dirname(file), { recursive: true });
                    fs.writeFileSync(file, output, 'utf-8');
                }
            }
        });
    }
};

module.exports = htmlomatic;