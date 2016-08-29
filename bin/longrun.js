#!/usr/bin/env node

'use strict';

const argv = process.argv.slice(2);
const exit = process.exit;

if (/^-v|--version$/.test(argv)) {
    version();
    exit();
}

const path = require('path');

const fail = require('../lib/cli').fail;

const dir = path.join(__dirname, '..');

const yargs = require('yargs');
const parser = yargs
    .showHelpOnFail(false)
    .strict()
    .usage('usage: longrun [command] [options]')
    .commandDir(path.join(dir, 'lib/cli'))
    .pkgConf('', dir)
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

const args = parser.argv;

if (args.version)
    version();
else if (!args._.length)
    yargs.showHelp();

function version() {
    console.log(`v${require('../package').version}`);
}

