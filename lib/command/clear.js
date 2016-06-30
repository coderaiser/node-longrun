'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const map = require('async').map;

const ifNotFound = require('../if-not-found');

const clearDirs = currify((name, array) => {
    array.some((item) => {
        const is = name === item.name;
        
        if (is)
            item.directories = [];
        
        return is;
    });
    
    return array;
});

module.exports = (runners, options, fn) => {
    let names = options.names;
    const all = options.all;
    
    if (!all && !names.length)
        return fn(Error('name could not be empty'));
    
    if (all)
        names = runners.map((runner) => runner.name);
    
    map(names, (name, cb) => {
        clearer(name, runners, cb);
    }, (error, result) => {
        result = result || [];
        fn(error, result.pop());
    });
};

function clearer(name, runners, fn) {
    const clear = squad.apply(null, [
        clearDirs(name),
        ifNotFound(name),
    ]);
    
    let result;
    const error = tryCatch(() => {
        result = clear(runners);
    });
    
    fn(error, result);
}

