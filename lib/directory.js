'use strict';

const find = require('./find');
const exclude = require('./exclude');

module.exports.add = (name, directory, runners) => {
    check(name, directory, runners);
    
    const runner = find(name, runners.slice());
    checkRunner(name, runner);
    
    const {directories} = runner;
    checkDirectoryIn(name, directory, directories);
    
    directories.push(directory);
    
    return runners;
};

module.exports.remove = (name, directory, runners) => {
    check(name, directory, runners);
    
    const runner = find(name, runners);
    checkRunner(name, runner);
    
    const {directories} = runner;
    checkDirectoryOut(name, directory, directories);
    
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

function checkDirectoryIn(name, directory, directories) {
    if (directories.includes(directory))
        throw Error(`current directory already in runner "${name}"`);
}

function checkDirectoryOut(name, directory, directories) {
    if (!directories.includes(directory))
        throw Error(`current directory is absent in runner "${name}"`);
}
