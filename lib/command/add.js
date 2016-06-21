'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const ifNotFound = require('../if-not-found');
const addDirectory = currify(require('../directory').add);

module.exports = (runners, runItem, fn) => {
    const name = runItem.name;
    const cwd = runItem.cwd;
    const add = squad.apply(null, [
        addDirectory(name, cwd),
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

