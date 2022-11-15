const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const glob = require('glob');

const splice = (string, start, length, replacement) => {
    return string.substr(0, start) + replacement + string.substr(start + length);
};

const read = file => {
    try {
        const data = fs.readFileSync(file, 'utf-8');
        return data;
    } catch (err) {
        return err;
    }
};

const parse = (data, root) => {
    const pattern = /<!--(\s+)#include(\s+)(.*)(\s+)-->/g;
    let output = data;

    while (match = pattern.exec(output)) {
        const include = read(path.join(root, match[3]));
        output = splice(output, match.index, match[0].length, include);
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
                const output = parse(read(match), path.resolve(match));
                // TODO: Write the output to a file

                if (!config.output)
                    console.log(output);
            }
        });
    }
};

module.exports = htmlomatic;