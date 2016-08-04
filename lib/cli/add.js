'use strict';

const {fail, writable} = require('../cli');

module.exports.command = 'add';
module.exports.description = 'Add current directory to runner';
module.exports.handler = writable('add');

module.exports.builder = (yargs) => {
    return yargs.usage('usage: longrun add [name] [options]')
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
        .fail(fail('add'));
};

