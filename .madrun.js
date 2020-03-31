'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => 'tape \'test/**/*.js\'',
    'watch': () => 'nodemon --watch lib --watch test --exec',
    'watch:test': () => run('watch', '"npm test"'),
    'lint': () => 'putout bin lib test .madrun.js',
    'fix:lint': () => run('lint', '--fix'),
    'jscs-fix': () => run(['jscs', '--fix']),
    'coverage': () => 'nyc npm test',
    'watch:coverage': () => run('watch', run('coverage')),
    'report': () => 'nyc report --reporter=text-lcov | coveralls',
};

