'use strict';

const currify = require('currify');

const longrun = require('../longrun');
const ifNotFound = require('../if-not-found');
const success = require('../success');

const id = (a) => a;

const filterIf = currify((name, array) => {
    return !name ? array : array.filter((item) => {
        return name === item.name;
    });
});

module.exports = (runners, runner, fn) => {
    const name = runner.name;
    const all = runner.all;
    
    Promise
        .resolve(runners)
        .then(all ? id : checkName(name))
        .then(all ? id : ifNotFound(name))
        .then(all ? id : filterIf(name))
        .then(longrun)
        .then(success(fn))
        .catch(fn);
};

function checkName(name) {
    return (array) => {
        if (!name)
            throw Error('name could not be empty');
        
        return array;
    };
}

