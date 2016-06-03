'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const ifNotFound = require('../if-not-found');
const removeDirectory  = currify(require('../directory').remove);

module.exports = (runners, fn, runItem) => {
    const name = runItem.name;
    const cwd = runItem.cwd;
    const remove = squad.apply(null, [
        removeDirectory(name, cwd),
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

