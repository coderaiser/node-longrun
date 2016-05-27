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
const exclude = require('../exclude');

const ifNotFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner with name "${name}" doesn\'t exist`);
     
    return array;
});

const removeDir = currify((name, directory, array) => {
    const item = array.filter((item) => {
        return name === item.name;
    })[0];
    
    item.directories = exclude(directory, item.directories);
    
    return array;
});

const cwd = squad(tildify, process.cwd);

module.exports = (argv) => {
    const name = argv._[1];
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const create = squad.apply(null, [
        apart(writejson.sync, longrunPath),
        removeDir(name, cwd()),
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

