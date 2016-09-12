'use strict';

const path = require('path');
const fail = require('./cli').fail;

const yargs = require('yargs');

const commandDir = path.join(__dirname, 'cli');
const pkgConf = path.join(__dirname, '..');

module.exports = yargs
    .showHelpOnFail(false)
    .strict()
    .usage('usage: longrun [command] [options]')
    .commandDir(commandDir)
    .pkgConf('', pkgConf)
    .option('v', {
        alias: 'version',
        type: 'boolean',
        description: 'Show version'
    })
    .option('h', {
        alias: 'help',
        type: 'boolean',
    })
    .help('h')
    .fail(fail(' '));

