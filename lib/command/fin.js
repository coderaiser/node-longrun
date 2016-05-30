'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const find = require('../find');

const ifFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner "${name}" not found`);
     
    return array;
});

const remove = currify((name, array) => {
    return array.filter((item) => name !== item.name);
});

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
    const fin = squad.apply(null, [
        remove(name),
        ifFound(name),
    ]);
    
    let result;
    const error = tryCatch(() => {
        checkName(name);
        
        result = fin(runners);
    });
    
    fn(error, result);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

