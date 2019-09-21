'use strict';

const currify = require('currify');

const success = require('../success');
const ifNotFound = require('../if-not-found');

const whatIfNotFound = currify((runners, names) => {
    for (const name of names) {
        ifNotFound(name, runners);
    }
    
    return names;
});

const filter = currify((runners, names) => {
    return runners.filter((runner) => {
        return !~names.indexOf(runner.name);
    });
});

module.exports = (runners, options, fn) => {
    if (options.all)
        return fn(null, []);
    
    Promise
        .resolve(options.names)
        .then(ifNoName)
        .then(whatIfNotFound(runners))
        .then(filter(runners))
        .then(success(fn))
        .catch(fn);
};

function ifNoName(names) {
    if (!names.length)
        throw Error('name could not be empty');
    
    return names;
}

