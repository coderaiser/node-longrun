'use strict';

const find = require('./find');
const currify = require('currify');

module.exports = currify((name, array) => {
    if (find(name, array))
        throw Error(`runner with name "${name}" already exist`);
    
    return array;
});

