'use strict';

const cli = require('../cli');
const fail = cli.fail;
const writable = cli.writable;

module.exports.command = 'remove';
module.exports.description = 'Remove current directory from runner';
module.exports.handler = writable('remove');

module.exports.builder = (yargs) => {
    return yargs.strict()
        .usage('usage: longrun remove [name] [options]')
        .option('l', {
            alias: 'list',
            type: 'boolean',
            description: 'show directory list of runner'
        })
        .option('L', {
            alias: 'list-all',
            type: 'boolean',
            description: 'show directory lists of all runners'
        })
        .fail(fail('remove'));
};

