'use strict';

const cli = require('../cli');
const fail = cli.fail;
const writable = cli.writable;

module.exports.command = 'init';
module.exports.description = 'Init runner';
module.exports.handler = writable('init');

module.exports.builder = (yargs) => {
    return yargs.strict()
        .fail(fail('init'))
        .usage('usage: longrun init [name] [options]')
        .option('c', {
            alias: 'command',
            type: 'string',
            description: 'Command to execute'
        });
};

