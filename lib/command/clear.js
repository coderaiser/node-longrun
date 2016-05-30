'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const find = require('../find');

const ifNotFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner with name "${name}" doesn\'t exist`);
     
    return array;
});

const clearDirs = currify((name, array) => {
    array.some((item) => {
        const is = name === item.name;
        
        if (is)
            item.directories = [];
        
        return is;
    });
    
    return array;
});

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
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

