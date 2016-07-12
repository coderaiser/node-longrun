'use strict';

const tryCatch = require('try-catch');
const ifNotFound = require('../if-not-found');

module.exports = (runners, options, fn) => {
    let names = options.names;
    const all = options.all;
    
    if (!all && !names.length)
        return fn(Error('name could not be empty'));
    
    if (all)
        names = runners.map((runner) => runner.name);
    
    const error = tryCatch(() => {
        names.forEach((name) => {
            ifNotFound(name, runners);
        });
    });
    
    if (error)
        return fn(error);
    
    const result = runners.filter((runner) => {
        return !names.includes(runner.name);
    });
    
    fn(null, result);
};

