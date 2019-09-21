'use strict';

const currify = require('currify');

const success = require('../success');
const ifNotFound = require('../if-not-found');
const removeDirectory = currify(require('../directory').remove);

const checkName = currify((name, runners) => {
    if (!name)
        throw Error('name could not be empty');
    
    return runners;
});

module.exports = (runners, runItem, fn) => {
    const {
        name,
        cwd,
    } = runItem;
    
    Promise.resolve(runners)
        .then(checkName(name))
        .then(ifNotFound(name))
        .then(removeDirectory(name, cwd))
        .then(success(fn))
        .catch(fn);
};

