'use strict';

const cli = require('../cli');
const fail = cli.fail;
const runnable = cli.runnable;

module.exports.command = 'run';
module.exports.description = 'Run commands from ~/.longrun.json';
module.exports.handler = runnable('run');

module.exports.builder = (yargs) => {
    return yargs.strict()
        .usage('usage: longrun run [name] [options]')
        .fail(fail('run'))
        .option('c', {
            alias: 'clear',
            type: 'boolean',
            description: 'Clear directories'
        })
        .option('a', {
            alias: 'all',
            type: 'boolean',
            description: 'Run all runners'
        });
};
