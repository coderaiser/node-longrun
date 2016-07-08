'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const longrun = require('../longrun');
const ifNotFound = require('../if-not-found');
const id = (a) => a;

const filterIf = currify((name, array) => {
    return !name ? array : array.filter((item) => {
        return name === item.name;
    });
});

const checkRunners = (array) => {
    if (!array.length)
        throw Error('runners list is empty');
    
    return array;
};

module.exports = (runners, runner, fn) => {
    const name = runner.name;
    const all = runner.all;
    const run = squad.apply(null, [
        longrun,
        checkRunners,
        all ? id : filterIf(name),
        all ? id : ifNotFound(name),
        all ? id : checkName(name)
    ]);
    
    let result;
    const error = tryCatch(() => {
        result = run(runners);
    });
     
    fn(error, result);
};

function checkName(name) {
    return (array) => {
        if (!name)
            throw Error('name could not be empty');
        
        return array;
    };
}

