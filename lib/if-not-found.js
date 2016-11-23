'use strict';

const find = require('./find');
const currify = require('currify/legacy');

module.exports = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner with name "${name}" doesn\'t exist`);
     
    return array;
});

