'use strict';

const {
    fail,
    writable,
} = require('../cli');

module.exports.command = 'clear';
module.exports.description = 'Clear directories list from runners';
module.exports.handler = writable('clear');

module.exports.builder = (yargs) => {
    return yargs.strict()
        .usage('usage: longrun clear [names] [options]')
        .fail(fail('clear'))
        .option('a', {
            alias: 'all',
            type: 'bool',
            description: 'Clear directories from all runners',
        })
        .option('l', {
            alias: 'list',
            type: 'boolean',
            description: 'show directory lists of all runners',
        })
        .option('L', {
            alias: 'list-all',
            type: 'boolean',
            description: 'show all runners',
        });
};

