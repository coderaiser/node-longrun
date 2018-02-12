'use strict';

const currify = require('currify/legacy');
const map = require('async/map');

const success = require('../success');
const ifNotFound = require('../if-not-found');

const checkNames = currify(check);
const getNames = currify(get);

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
        .then(checkNames(options))
        .then(getNames(options))
        .then((names) => {
            map(names, (name, cb) => {
                clearer(name, runners, cb);
            }, (error, result) => {
                fn(error, (result || []).pop());
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

function check(options, runners) {
    const all = options.all;
    const names = options.names;
    
    if (!all && !names.length) {
        throw Error('name could not be empty');
    }
    
    return runners;
}

function get(options, runners) {
    const all = options.all;
    const names = options.names;
    
    if (!all)
        return names;
   
   return runners.map((runner) => runner.name);
}

