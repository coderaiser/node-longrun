'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const longrun = require('../longrun');

const filterIf = currify((name, array) => {
    return !name ? array : array.filter((item) => {
        return name === item.name;
    });
});

const ifNotFound = currify((name, array) => {
    if (name && !array.length)
        throw Error(`name "${name}" is absent in runners`);
    
    return array;
});

module.exports = (argv) => {
    const name = argv._[1];
    const run = squad.apply(null, [
        longrun,
        ifNotFound(name),
        filterIf(name),
        readjson.sync
    ]);
    
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const error = tryCatch(() => {
        run(longrunPath)
            .on('data', (data) => {
                process.stdout.write(data);
            })
            .on('error', (error) => {
                process.stderr.write(error.message);
            });
    });
    
    exitIfError(error);
};

function exitIfError(error) {
    error && exit(error.message);
}

function exit(message) {
    console.error(message);
    process.exit(-1);
}
