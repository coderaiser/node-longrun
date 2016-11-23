'use strict';

const currify = require('currify/legacy');

module.exports = currify((fn, a) => fn(null, a));

