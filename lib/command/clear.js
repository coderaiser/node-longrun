'use strict';

const currify = require('currify');
const map = require('async').map;

const swap = currify((fn, a, b) => fn(b, a));

const success = require('../success');
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
    Promise.resolve(runners)
        .then(swap(check, options))
        .then(swap(getNames, options))
        .then((names) => {
            map(names, (name, cb) => {
                clearer(name, runners, cb);
            }, (error, result = []) => {
                fn(error, result.pop());
            });
        })
        .catch(fn);
};

function clearer(name, runners, fn) {
    Promise
        .resolve(runners)
        .then(ifNotFound(name))
        .then(clearDirs(name))
        .then(success(fn))
        .catch(fn);
}

function check(runners, options) {
    const all = options.all;
    const names = options.names;
    
    if (!all && !names.length) {
        throw Error('name could not be empty');
    }
    
    return runners;
}

function getNames(runners, options) {
    const all = options.all;
    const names = options.names;
    
    if (!all)
        return names;
   
   return runners.map((runner) => runner.name);
}

