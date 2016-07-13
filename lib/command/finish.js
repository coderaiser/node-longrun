'use strict';

const tryCatch = require('try-catch');
const currify = require('currify');
const squad = require('squad');

const ifNotFound = require('../if-not-found');

const ifNoName = currify((names) => {
    if (!names.length)
        throw Error('name could not be empty');
    
    return names;
});

const whatIfNotFound = currify((runners, names) => {
    names.forEach((name) => {
        ifNotFound(name, runners);
    });
    
    return names;
});

const filter = currify((runners, names) => {
    return runners.filter((runner) => {
        return !~names.indexOf(runner.name);
    });
});

module.exports = (runners, options, cb) => {
    const names = options.names;
    const all = options.all;
    
    if (all)
        return cb(null, []);
    
    const finish = squad.apply(null, [
        filter(runners),
        whatIfNotFound(runners),
        ifNoName
   ]);
    
    let result;
    const error = tryCatch(() => {
        result = finish(names);
    });
    
    cb(error, result);
};

