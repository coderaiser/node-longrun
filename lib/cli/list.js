'use strict';

const cli = require('../cli');
const fail = cli.fail;
const readable = cli.readable;

module.exports.command = 'list';
module.exports.description = 'List all runners';
module.exports.handler = readable('list');

module.exports.builder = (yargs) => {
    return yargs.strict()
        .usage('usage: longrun list [options]')
        .fail(fail('list'))
        .option('a', {
            alias: 'all',
            type: 'bool',
            description: 'Show all information'
        })
        .option('d', {
            alias: 'directories',
            type: 'bool',
            description: 'Show directories'
        })
        .option('c', {
            alias: 'commands',
            type: 'bool',
            description: 'Show commands'
        });
};

