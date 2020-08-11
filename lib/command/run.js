'use strict';

const {callbackify} = require('util');

const longrun = require('../longrun');
const ifNotFound = require('../if-not-found');

const filterIf = (name, array) => {
    return !name ? array : array.filter((item) => {
        return name === item.name;
    });
};

module.exports = callbackify(async (runners, runner) => {
    const {
        name,
        all,
    } = runner;
    
    if (all)
        return longrun(runners);
    
    checkName(name);
    ifNotFound(name, runners);
    
    const filteredRunners = filterIf(name, runners);
    
    return longrun(filteredRunners);
});

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

