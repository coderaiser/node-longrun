'use strict';

const currify = require('currify');

module.exports = currify((fn, a) => fn(null, a));

