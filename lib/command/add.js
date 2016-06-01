'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const find = require('../find');
const ifNotFound = require('../if-not-found');

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

module.exports = (runners, fn, runItem) => {
    const name = runItem.name;
    const cwd = runItem.cwd;
    const add = squad.apply(null, [
        addDir(name, cwd),
        ifNotFound(name)
    ]);
    
    let result;
    const error = tryCatch(() => {
        checkName(name);
        result = add(runners);
    });
    
    fn(error, result);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

