'use strict';

const {
    fail,
    writable,
} = require('../cli');

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
            description: 'Command to execute',
        });
};

