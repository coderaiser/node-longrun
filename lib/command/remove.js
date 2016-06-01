'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const find = require('../find');
const exclude = require('../exclude');

const ifNotFound = require('../if-not-found');

const removeDir = currify((name, directory, array) => {
    const item = array.filter((item) => {
        return name === item.name;
    })[0];
    
    item.directories = exclude(directory, item.directories);
    
    return array;
});

module.exports = (runners, fn, runItem) => {
    const name = runItem.name;
    const cwd = runItem.cwd;
    const remove = squad.apply(null, [
        removeDir(name, cwd),
        ifNotFound(name),
    ]);
    
    let result;
    const error = tryCatch(() => {
        checkName(name);
        result = remove(runners);
    });
    
    fn(error, result);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

