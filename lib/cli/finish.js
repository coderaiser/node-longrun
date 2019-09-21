'use strict';

const {
    fail,
    writable,
} = require('../cli');

module.exports.command = 'finish';
module.exports.description = 'Remove runner(s)';
module.exports.handler = writable('finish');

module.exports.builder = (yargs) => {
    return yargs.strict()
        .fail(fail('finish'))
        .usage('usage: longrun finish [names] [options]')
        .option('a', {
            alias: 'all',
            type: 'boolean',
            description: 'Remove all runners',
        });
};

