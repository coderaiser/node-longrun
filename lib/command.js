'use strict';

const find = require('./find');

module.exports = (name, command, runners) => {
    check(name, command, runners);
    
    const runner = find(name, runners.slice());
    
    checkRunner(name, runner);
    runner.command = command;
    
    return runners;
};

function check(name, directory, items) {
    if (typeof name !== 'string')
        throw Error('name should be string!');
    
    if (typeof directory !== 'string')
        throw Error('command should be string!');
    
    if (!Array.isArray(items))
        throw Error('runners should be an array!');
}

function checkRunner(name, runner) {
    if (!runner)
        throw Error(`name "${name}" is absent in runners`);
}

