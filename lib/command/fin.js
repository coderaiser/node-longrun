'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const writejson = require('writejson');
const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const apart = require('apart');
const find = require('../find');

const ifFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner "${name}" not found`);
     
    return array;
});

const remove = currify((name, array) => {
    return array.filter((item) => name !== item.name);
});

module.exports = (argv) => {
    const name = argv._[1];
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const create = squad.apply(null, [
        apart(writejson.sync, longrunPath),
        remove(name),
        ifFound(name),
        readjson.sync
    ]);
    
    const error = tryCatch(() => {
        checkName(name);
        
        create(longrunPath);
    });
    
    exitIfError(error);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

function exitIfError(error) {
    error && exit(error.message);
}

function exit(message) {
    console.error(message);
    process.exit(-1);
}

