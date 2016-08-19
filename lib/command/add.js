'use strict';

const currify = require('currify');

const second = currify((fn, a) => fn(null, a));

const ifNotFound = require('../if-not-found');
const addDirectory = currify(require('../directory').add);

module.exports = (runners, runItem, fn) => {
    const name = runItem.name;
    const cwd = runItem.cwd;
    
    Promise
        .resolve({name, runners})
        .then(checkName)
        .then(ifNotFound(name))
        .then(addDirectory(name, cwd))
        .then(second(fn))
        .catch(fn);
};

function checkName({name, runners}) {
    if (!name)
        throw Error('name could not be empty');
    
    return runners;
}

