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
    if (find(name, array))
        throw Error(`name "${name}" already exist`);
     
    return array;
});

const add = currify((name, command, directory, array) => {
    return array.concat({
        name,
        command,
        directories: [
            directory
        ]
    });
});

module.exports = (argv) => {
    const name = argv._[1];
    const command = argv.command;
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const create = squad.apply(null, [
        apart(writejson.sync, longrunPath),
        add(name, command, process.cwd()),
        ifFound(name),
        readjson.sync
    ]);
    
    const error = tryCatch(() => {
        checkName(name);
        checkCommand(argv.command);
        
        create(longrunPath);
    });
    
    exitIfError(error);
};

function checkCommand(command) {
    if (!command)
        throw Error('command could not be empty');
}

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

