'use strict';

const find = require('./find');
const exclude = require('./exclude');

module.exports.add = (name, directory, runners) => {
    check(name, directory, runners);
    
    const runner = find(name, runners.slice());
    
    checkRunner(name, runner);
    runner.directories.push(directory);
     
    return runners;
};

module.exports.remove = (name, directory, runners) => {
    check(name, directory, runners);
    
    const runner = find(name, runners);
    
    checkRunner(name, runner);
    
    const directories = runner.directories;
    runner.directories = exclude(directory, directories);
    
    return runners;
};

function check(name, directory, items) {
    if (typeof name !== 'string')
        throw Error('name should be string!');
    
    if (typeof directory !== 'string')
        throw Error('directory should be string!');
    
    if (!Array.isArray(items))
        throw Error('runners should be an array!');
}

function checkRunner(name, runner) {
    if (!runner)
        throw Error(`name "${name}" is absent in runners`);
}

