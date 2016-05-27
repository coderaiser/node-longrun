'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const writejson = require('writejson');
const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const apart = require('apart');
const tildify = require('tildify');

const find = require('../find');

const ifNotFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner with name "${name}" doesn\'t exist`);
     
    return array;
});

const addDir = currify((name, directory, array) => {
    array.filter((item) => name === item.name)
        .map((item) => item.directories)
        .forEach((directories) => {
            if (find(directory, directories))
                throw Error(`current directory already on a list`);
            
            directories.push(directory);
        });
    
    return array;
});

const cwd = squad(tildify, process.cwd);

module.exports = (argv) => {
    const name = argv._[1];
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const create = squad.apply(null, [
        apart(writejson.sync, longrunPath),
        addDir(name, cwd()),
        ifNotFound(name),
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

