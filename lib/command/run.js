'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const longrun = require('../longrun');

const filterIf = currify((name, array) => {
    return !name ? array : array.filter((item) => {
        return name === item.name;
    });
});

const ifNotFound = require('../if-not-found');

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
    const run = squad.apply(null, [
        longrun,
        ifNotFound(name),
        filterIf(name)
    ]);
    
    let result;
    const error = tryCatch(() => {
        result = run(runners);
    });
     
    fn(error, result);
};

