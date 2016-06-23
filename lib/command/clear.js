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
    const empty = () => {};
    const names = options.names;
    
    if (!names.length)
        return fn(Error('name could not be empty'));
    
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
        checkName(name);
        result = clear(runners);
    });
    
    fn(error, result);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

